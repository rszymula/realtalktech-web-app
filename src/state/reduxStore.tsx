import React, { useContext } from 'react';
import { CategoryNames, categories } from '../constants/constants';

export const ReduxContext = React.createContext(undefined);

export function createStore(reducer){
  let state = reducer(undefined, {});
  // let onChange;
  let listeners = []
  return {
    getState: () => state,
    // subscribe: (func) => onChange = func,
    subscribe: (func) => {
      listeners.push(func);
      return () => {
        const idx = listeners.indexOf(func)
        listeners.splice(idx, 1)
      }
    },
    dispatch: (action) => {
      console.log("LD3-Dispatching", action)
      state = reducer(state, action)
      console.log("LD3-NEW_STATE", state)
      listeners.forEach(listener => {
        console.log(`LD3-calling-${listener}`)
        listener()
      })
    }
  }
}

const INDUSTRY_DEFAULT = [
  {
    id: 1,
    name: "industry1",
  },
  {
    id: 2,
    name: "industry2",
  }
];

const CATEGORIES_DEFAULT = categories//.map(item => item.name)

const INTERESTS_DEFAULT = [
  {
    id: 1,
    name: "interest1",
  },
  {
    id: 2,
    name: "interest2",
  },
  {
    id: 3,
    name: "interest3",
  },
  {
    id: 4,
    name: "interest4",
  },
  {
    id: 5,
    name: "interest5",
  }
];

const SKILLS_DEFAULT = [
  {
    id: 1,
    name: "Snowflake",
  },
  {
    id: 2,
    name: "Databricks",
  },
  {
    id: 2,
    name: "HERE",
  }
]

const initialState = {
  industry: INDUSTRY_DEFAULT, // What industry are you in?
  categories: CATEGORIES_DEFAULT, // What do you do?
  interests: INTERESTS_DEFAULT, // What software / tech interests you?
  skills: SKILLS_DEFAULT,
  auth: {
    userId: -1,
    token: "",
  },
  loginLoading: false,
  loginError: false,
  signupLoading: false,
  signupError: false,
  users: {},
  userLoading: false,
  userError: null,
  feed: Object.values(CategoryNames).filter(item => isNaN(Number(item))).reduce((acc, item) => (acc[item] = [], acc), {}),
  posts: {},
  postCreateLoading: false,
  postCreateError: true,
  feedLoading: {},
  feedError: {},
  // comments: [],
  comments: {},
  commentsLoading: false,
  commentsError: null,
  companies: [1, 2],
  companiesLoading: false,
  companiesError: null,
  commentCreateLoading: false,
  commentCreateError: false,
  // questions: [],
  // usersLoading: false,
  // usersError: null,
  // followups: [],
  // usersLoading: false,
  // usersError: null,
  vendorGroups: {},
  vendorGroupsLoading: false,
  vendorGrouspError: null,
  vendors: {},
  vendorsLoading: false,
  vendorsError: false,
  apiCallResult: {
    message: "",
    active: false,
    error: false,
  }
}

export function reducer(state = initialState, action){

  console.log("STORE_BEFORE", state, action)
  switch(action.type){
    case 'POSTS_CREATE_SUCCESS':
      // console.log("STEP0W", action.payload)
      const temp = action.payload.categories.reduce((accum, curr) => {
        // accum[curr] = [...state.feed[curr], action.payload.id]
        console.log(curr, action.payload.id, state.feed[curr])
        accum[curr] = [action.payload.id, ...state.feed[curr]]
        console.log({accum})
        return accum
      }, {});
      // console.log("STEP1W", temp)
      const res3 = {
        ...state,
        feed: {
          ...state.feed,
          ...temp,
        },
        posts: {
          ...state.posts,
          [action.payload.id]: action.payload,
        },
        postCreateLoading: false,
        postCreateError: false,
      }
    // console.log("STEP2W")
    // console.log("123123", res3)
    return res3
    case 'POSTS_SUCCESS':
      console.log("POST_PAY", action.payload)

      const logthis = {
        ...state.feed,
        [action.payload.category]:[
          ...state.feed[action.payload.category],
          ...action.payload.data
        ]
      }
      const res = {
        ...state,
        feed: {
          ...state.feed,
          [action.payload.category]:[
            ...state.feed[action.payload.category],
            ...action.payload.data.map(item => item.id)
          ]
        },
        posts: {
          ...state.posts,
          ...action.payload.data.reduce((accum, cur) => {
            const userVote = cur.userVote === true ? 1 : cur.userVote === false ? -1 : 0
            accum[cur.id] = {...cur, userVote }
            return accum;
          }, {}),
        },
        feedLoading: {
          ...state.feedLoading,
          [action.payload.category]: false,
        },
        feedError: {
          ...state.feedError,
          [action.payload.category]: false,
        },
      }
    console.log("123123", res)
    return res
    case 'POSTS_LOADING':
      console.log("WTFFFF WHERE ARE YOU", action.payload)
      const resFuck = {
        ...state,
        feedLoading: {
          ...state.feedLoading,
          [action.payload]: true,
        },
        feedError: {
          ...state.feedError,
          [action.payload]: false,
        },
      }
      console.log("RESFUCKYOU", resFuck)
      return resFuck
    case 'POSTS_ERROR':
      return {
        ...state,
        feedLoading: {
          ...state.feedLoading,
          [action.payload]: false,
        },
        feedError: {
          ...state.feedError,
          [action.payload]: true,
        },
      }
    case 'COMMENTS_CREATE_SUCCESS':
      const res4 = {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.comment.id]: action.payload.comment,
        },
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...state.posts[action.payload.postId],
            commentIds: [
              action.payload.comment.id,
              ...state.posts[action.payload.postId].commentIds,
            ]
          }
        }
      }
      console.log("Mkaing comments", action.payload, res4)
      return res4
    case 'COMMENTS_SUCCESS':
      console.log("COM_PAY", action.payload)
      const res2 = {
        ...state,
        comments: {
          ...state.comments,
          ...action.payload.reduce((accum, cur) => {
            const userVote = typeof cur.userVote === 'number' ? cur.userVote :
              cur.userVote === true ? 1 : cur.userVote === false ? -1 : 0
            accum[cur.id] = {...cur, userVote}
            return accum
          }, {}),
        },
        commentsLoading: false,
        commentsError: false,
      }
      console.log("098890", res2)
      return res2
    case 'COMMENTS_LOADING':
      return {
        ...state,
        commentsLoading: true,
        commentsError: false,
      }
    case 'COMMENTS_ERROR':
      return {
        ...state,
        commentsLoading: false,
        commentsError: true,
      }
    case 'COMMENT_UPVOTE_SUCCESS': {
      const comment = state.comments[action.payload.commentId];
      const up = action.payload.isUpvote ? comment.totalUpvotes + 1 : comment.totalUpvotes;
      const down = !action.payload.isUpvote ? comment.totalDownvotes + 1 : comment.totalDownvotes;
      const userVote = action.payload.isUpvote ? comment.userVote + 1 : comment.userVote - 1;
      console.log("UV", comment.userVote, userVote)
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.commentId]:
            {...state.comments[action.payload.commentId],
              totalUpvotes: up,
              totalDownvotes: down,
              userVote,
            }
        }
      }
    }
    case 'VENDOR_GROUPS_SUCCESS':
      const vendorGroupModified = action.payload.map(item => ({id: item.id, name: item.categoryName, icon: item.icon, vendorIds: []}))
      const vendorGroupMap = vendorGroupModified.reduce((accum, cur) => {
        accum[cur.id] = cur
        return accum
      }, {});
      // const vendorGroupMapWithVendorIds = {...vendorGroupMap, vendorIds: []}
      return {
        ...state,
        // vendorGroups: [...state.vendorGroups, ...action.payload],
        vendorGroups: {...state.vendorGroups, ...vendorGroupMap},
        vendorGroupsLoading: false,
        vendorGrouspError: false,
      }
    case 'VENDOR_GROUPS_LOADING':
      return {
        ...state,
        vendorGroupsLoading: true,
        vendorGrouspError: false,
      }
    case 'VENDOR_GROUPS_ERROR':
      return {
        ...state,
        vendorGroupsLoading: false,
        vendorGrouspError: true,
      }
    case 'VENDORS_BY_GROUP_SUCCESS':
      const vendorGroups = {
        ...state.vendorGroups,
        [action.payload.vendorGroupId]: {
          ...state.vendorGroups[action.payload.vendorGroupId],
          vendorIds: action.payload.vendors.map(item => item.id)
        }
      };
      const vendorMap = action.payload.vendors.reduce((accum, cur) => {
        accum[cur.id] = cur
        return accum
      }, {});
      console.log("THISW", vendorGroups, action.payload)
      return {
        ...state,
        vendorGroups,
        vendors: {...state.vendors, ...vendorMap},
        vendorGroupsLoading: false,
        vendorGrouspError: false,
      }
    // case 'GET_QUESTIONS':
    //   return {...state, questions: [...state.questions, action.payload]}
    // case 'GET_FOLLOWUPS':
    //   return {...state, followups: [...state.followups, action.payload]}
    case 'VENDOR_DETAILS_SUCCESS':
      const vendors = {
        ...state.vendors,
        [action.payload.vendorId]: {...state.vendors[action.payload.vendorId], ...action.payload.vendor},
      };
      console.log("THISW", vendorGroups, action.payload)
      return {
        ...state,
        vendors,
      }
    case 'VENDORS_LOADING':
      return {
        ...state,
        vendorsLoading: true,
        vendorsError: false,
      }
    case 'VENDORS_ERROR':
      return {
        ...state,
        vendorsLoading: false,
        vendorsError: true,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        auth: action.payload.auth,
        users: {...state.users, [action.payload.user.id]: action.payload.user},
        loginLoading: false,
        loginError: false,
      }
    case 'LOGIN_LOADING':
      return {
        ...state,
        loginLoading: true,
        loginError: false,
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        loginLoading: false,
        loginError: true,
      }
    case 'LOGOUT':
      return {
        ...state,
        auth: {
          userId: -1,
          token: "",
        },
        loginLoading: false,
        loginError: false,
      }
    case 'RELOAD':
      return {
        ...state,
        auth: action.payload.auth,
        users: {...state.users, [action.payload.user.id]: action.payload.user},
        loginLoading: false,
        loginError: false,
      }
    case 'SIGNUP_SUCCESS':
      console.log("LD3-success")
      return {
        ...state,
        auth: action.payload.auth,
        users: {...state.users, [action.payload.user.id]: action.payload.user},
        signupLoading: false,
        signupError: false,
      }
    case 'SIGNUP_LOADING':
      console.log("LD3-setLoad")
      return {
        ...state,
        signupLoading: true,
        signupError: false,
      }
    case 'SIGNUP_ERROR':
      console.log("LD3-setErr")
      return {
        ...state,
        signupLoading: false,
        signupError: true,
      }
    case 'USER_SUCCESS':
      return {
        ...state,
        users: {...state.users, [action.payload.username]: action.payload},
        userLoading: false,
        userError: false,
      }
    case 'USER_LOADING':
      return {
        ...state,
        userLoading: true,
        userError: false,
      }
    case 'USER_ERROR':
      return {
        ...state,
        userLoading: false,
        userError: true,
      }
    case 'USER_ENDORSE_SUCCESS':
      // const endorsedUsername = action.payload.user.username
      // const endorsedUser = 
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.user.username]: {
            ...state.users[action.payload.user.username],
            // techStack: action.payload.user.techStack.map(skill => {
            //   return {
            //     ...skill,
            //     endorsed: true,
            //   }
            // })
            techStack: action.payload.user.techStack.map(skill => {
              return skill.id === action.payload.item.id ? {
                ...skill,
                endorsed: true,
                endorsementCount: skill.endorsementCount + 1,
              } : skill;
            })
          }
        },
      }
    case 'USER_EDIT_SUCCESS':
      const res5 = {
        ...state,
        users: {...state.users, [action.payload.id]: {...state.users[action.payload.id], ...action.payload}},
      }
      console.log("RES5W", res5)
      return res5
    case 'POST_UPVOTE_SUCCESS':
      const post = state.posts[action.payload.postId];
      console.log("PU_", post.numUpvotes, post.numDownvotes)
      const up = action.payload.isUpvote ? post.numUpvotes + 1 : post.numUpvotes;
      const down = !action.payload.isUpvote ? post.numDownvotes + 1 : post.numDownvotes;
      const userVote = action.payload.isUpvote ? post.userVote + 1 : post.userVote - 1;
      console.log("PU_UV", post.userVote, {userVote, up, down})
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]:
            {...state.posts[action.payload.postId],
              numUpvotes: up,
              numDownvotes: down,
              userVote,
            }
        }
      }
    case 'ONBOARDING_SUCCESS':
      return {
        ...state,
        industry: action.payload.industries.map(item => ({id: item.id, name: item.industry_name})),
        categories: action.payload.subscriptionAreas.map(item => ({id: item.id, name: item.category_name})),
        interests: action.payload.interestAreas.map(item => ({id: item.id, name: item.interest_area_name})),
        // vendors: action.payload.vendors,
        skills: action.payload.techstack.map(item => ({id: item.id, name: item.vendor_name})),
        onboardingLoading: false,
        onboardingError: false,
      }
    case 'ONBOARDING_LOADING':
      return {
        ...state,
        onboardingLoading: true,
        onboardingError: false,
      }
    case 'ONBOARDING_ERROR':
      return {
        ...state,
        onboardingLoading: false,
        onboardingError: true,
      }
    case 'API_CALL_RESULT':
      console.log("CALLEDW")
      return {
        ...state,
        apiCallResult: {
          message: action.payload.message,
          active: action.payload.active,
          error: action.payload.error,
        }
      }
    default:
      return state
  }
}


export function connect(mapStateToProps, mapDispatchToProps){
  // console.log("S2W", mapStateToProps)
  const func = (Component) => {
    return (props) => {
      const store = useContext(ReduxContext);
      const [forcedUpdates, setForcedUpdates] = React.useState(0)
      const [, forceUpdate] = React.useReducer(s => s + 1, 0)

      React.useEffect(() => {
        const unsubscribe = store.subscribe(handleEvent)
        return () => {
          unsubscribe();
        }
      }, [])

      const handleEvent = () => {
        // setForcedUpdates(forcedUpdates => forcedUpdates + 1)
        forceUpdate()
      }
      return (<Component
        {...props}
        {...mapStateToProps(store.getState())}
        {...mapDispatchToProps(store.dispatch, store.getState)}
      />)
    };
  }
  return func;
}
