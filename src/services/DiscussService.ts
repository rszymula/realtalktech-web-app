// import AsyncStorage from "@react-native-async-storage/async-storage";
import { COMMENTS_COUNT_PER_PAGE, FAIL_MESSAGE, POSTS_COUNT_PER_PAGE, categories } from "../constants/constants";
import { getConfig } from "../context/config";

const mockCommentTag = [
  {
    id: 1,
    commentId: 2,
    taggedUserId: 5,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 1,
    commentId: 5,
    taggedUserId: 3,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
];

export enum CategoryNames {
  HOME = "Home",
  AI = 'AI',
  ENGINEERING = 'Engineering',
  OPERATIONS = 'Operations',
  MARKETING = 'Marketing',
  SALES = 'Sales',
  CUSTOMER_SUCCESS = 'Customer Success',
  DATA = 'Data',
  PRODUCT = 'Product',
  HR_AND_TALENT = 'HR & Talent',
  FINANCE = 'Finance',
  LEADERHIP_EXEC = 'Leadership/Exec',
  FOUNDER = 'Founder',
  INVESTOR_VC = 'Investor/VC',
};

const mockCategories = [
  {
    id: 0,
    name: CategoryNames.HOME,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 1,
    name: CategoryNames.ENGINEERING,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 2,
    name: CategoryNames.OPERATIONS,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 3,
    name: CategoryNames.MARKETING,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 4,
    name: CategoryNames.SALES,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 5,
    name: CategoryNames.CUSTOMER_SUCCESS,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 6,
    name: CategoryNames.DATA,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 7,
    name: CategoryNames.PRODUCT,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 8,
    name: CategoryNames.HR_AND_TALENT,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 9,
    name: CategoryNames.FINANCE,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 10,
    name: CategoryNames.LEADERHIP_EXEC,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 11,
    name: CategoryNames.FOUNDER,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 12,
    name: CategoryNames.INVESTOR_VC,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
];

const mockUsers = [
  {
    id: 1,
    username: 'Alice123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 2,
    username: 'Bob123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 3,
    username: 'Casey123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 4,
    username: 'Devin123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 5,
    username: 'Erika123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 6,
    username: 'Frank123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 7,
    username: 'Gabe123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 8,
    username: 'Hugo123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 9,
    username: 'Ivan123',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  }
]

const mockPosts = [
  {
    id: 1,
    userId: 1,
    categoryId: 1,
    category: 'Engineering',
    title: 'horses',
    description: 'are cool',
    // upVotes: 5,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 2,
    userId: 2,
    categoryId: 0,
    category: "Home",
    title: 'traveling is fun',
    description: 'I like to travel',
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 3,
    userId: 5,
    categoryId: 1,
    category: 'Engineering',
    title: 'cars',
    description: 'so fast',
    createdTimestamp: '2023-05-12',
    updatedTimestamp: '2023-07-21',
  },
  {
    id: 3,
    userId: 5,
    categoryId: 1,
    category: 'Engineering',
    title: 'ships',
    description: 'vrooooomm',
    createdTimestamp: '2023-05-12',
    updatedTimestamp: '2023-07-21',
  },
];

const mockPostUpvotes = [
  {
    id: 1,
    postId: 1,
    userId: 2,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 2,
    postId: 1,
    userId: 3,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 3,
    postId: 1,
    userId: 4,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 4,
    postId: 2,
    userId: 17,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
];

const mockComments = [
  {
    id: 1,
    userId: 3,
    postId: 1,
    text: 'wow you are right',
    // upVotes: 2,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-02',
  },
  {
    id: 2,
    userId: 5,
    postId: 1,
    text: 'they really are',
    // upVotes: 2,
    createdTimestamp: '2023-05-02',
    updatedTimestamp: '2023-07-09',
  },
  {
    id: 3,
    userId: 8,
    postId: 2,
    text: 'I went to Europe last summer man',
    // upVotes: 2,
    createdTimestamp: '2023-02-23',
    updatedTimestamp: '2023-02-23',
  },
]

const mockCommentUpvotes = [
  {
    id: 1,
    commentId: 1,
    userId: 2,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 2,
    commentId: 1,
    userId: 5,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 3,
    commentId: 1,
    userId: 7,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 4,
    commentId: 1,
    userId: 8,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 5,
    commentId: 2,
    userId: 12,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 6,
    commentId: 2,
    userId: 15,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
  {
    id: 7,
    commentId: 3,
    userId: 23,
    createdTimestamp: '2023-01-02',
    updatedTimestamp: '2023-01-03',
  },
];

export function getComments(postId: number, page: number, count: number){
  const comments = mockComments
    .filter(comment => {
      return (comment.postId === postId)
    })
    .filter((item, idx) => idx >= page * count && idx < (page + 1) * count)
  console.log("filtered", {postId, page, count }, comments)

  const commentsWithUsername = comments.map(comment => {
    return { ...comment, username: mockUsers.find(user => user.id === comment.userId)
      ?.username || ''};
  })

  return commentsWithUsername;
}

export function getPostsWithCommentIdsAndUpvotes(category: CategoryNames, page: number, count: number){
  const posts = mockPosts
    .filter(item => item.category === category)
    .filter((item, idx) => idx >= page * count && idx < (page + 1) * count)

  const postsWithUsername = posts.map(post => {
    return {
      ...post,
      username: mockUsers.find(user => user.id === post.userId)
        ?.username || ''
    }
  });

  const postsWithCommentIds = postsWithUsername.map(post => {
      return {
        ...post,
        commentIds: mockComments
          .filter(comment => comment.postId === post.id)
          .map(comment => comment.id)
      }
    }
  );

  const postsWithCommentIdsAndUpvotes = postsWithCommentIds.map(post => {
    return {
      ...post,
      upVotes: mockPostUpvotes
        .filter(upvote => upvote.postId === post.id)
        .reduce((acu) => acu + 1, 0)
      }
    }
  );

  console.log(postsWithCommentIdsAndUpvotes)

  return postsWithCommentIdsAndUpvotes;
}


export function fetchPosts(dispatch){
  return (categoryId, auth, page = 1, count = POSTS_COUNT_PER_PAGE) => {
    const categoryIdSend = categoryId === 0 ? null : categoryId;
    // console.log("LOADINGW2")
    //console.log("CATSEW", categoryIdSend)
    //console.log("DISPATCHING BITCH", categories, categoryId, categoryIdSend, categories.find(cat => cat.id === categoryId)?.name)
    dispatch({type: "POSTS_LOADING", payload: categories.find(cat => cat.id === categoryId)?.name})
    // console.log("DISPATCHED BITCH")
    const {userId, token} = auth;
    // const {userId, token} = JSON.parse(AsyncStorage.getItem("auth").then)
    // AsyncStorage.getItem("auth").then(auth => {
    //   const {userId, token} = JSON.parse(
    // const userId = 17
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDc5MzMyOTQsImlhdCI6MTcwNzkyMjQ5NCwic3ViIjoxN30.5p8yH6BVTGIs_MPUKXqO9CJqZz10anU1nbbg3QoyPXc"
    // const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/feed?categoryId=${categoryIdSend}&userId=${userId}&page=${page}&count=${count}`
    const url = `${getConfig().monoServiceUrl}/feed?categoryId=${categoryIdSend}&userId=${userId}&page=${page}&count=${count}`
    // console.log("URLW", url)
    const params = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }
    // console.log("POSTSZ", url, params)
    fetch(url, params).then(res => {
      return res.json()
    }).then(json => {
      console.log("GOOD-fetchPosts", json)
      dispatch({type: "POSTS_SUCCESS", payload: {category: categories.find(cat => cat.id === categoryId)?.name, data: json.posts}})
    }).catch((err) => {
      console.log("ERR-fetchPosts", err)
      dispatch({type: "POSTS_ERROR", payload: categories.find(cat => cat.id === categoryId)?.name})
    })
  }
}

export function upvotePost(dispatch, getState){
  return (postId, isUpvote) => {
    const state = getState();
    const { posts, auth } = state
    const post = posts[postId]
    if(post.userVote > 0 && isUpvote || post.userVote < 0 && !isUpvote){
      // console.log("SHORTCIRC")
      return 
    }else{
      console.log("SHOTNO")
    }
    console.log("HERE1")
    const {userId, token} = auth;
    // const userId = 17
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDc5MzMyOTQsImlhdCI6MTcwNzkyMjQ5NCwic3ViIjoxN30.5p8yH6BVTGIs_MPUKXqO9CJqZz10anU1nbbg3QoyPXc"
    // const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/upvotePost`
    const url = `${getConfig().monoServiceUrl}/upvotePost`
    const params = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        isDownvote: !isUpvote,
        postId,
      }),
    }
    console.log("POSTSZ", url, params)
    fetch(url, params).then(res => {
      return res.json()
    }).then(json => {
      console.log("GOOD-upvote", json)
      console.log(state)
      dispatch({type: "POST_UPVOTE_SUCCESS", payload: {
        isUpvote,
        postId,
      }})
      //dispatch({type: "POSTS_SUCCESS", payload: {category: categories.find(cat => cat.id === categoryId)?.name, data: json.posts}})
    }).catch((err) => {
      console.log("ERR-upvote", err)
      dispatch({
        type: "API_CALL_RESULT",
        payload: {message: `Upvote ${FAIL_MESSAGE}`, active: true, error: true}
      })
    })
  }
}

export function fetchComments(dispatch){
  return (postId, auth, page = 1, count = COMMENTS_COUNT_PER_PAGE) => {
    dispatch({type: "COMMENTS_LOADING"})
    console.log("C1")
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDc5MzMyOTQsImlhdCI6MTcwNzkyMjQ5NCwic3ViIjoxN30.5p8yH6BVTGIs_MPUKXqO9CJqZz10anU1nbbg3QoyPXc"
    const {userId, token} = auth;
    // const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/getCommentsForPost?postId=${postId}&page=${page}&count=${count}`
    const url = `${getConfig().monoServiceUrl}/getCommentsForPost?postId=${postId}&page=${page}&count=${count}`
    const params = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }
    console.log("C2")
    fetch(url, params).then(res => {
      console.log("C3")
      return res.json()
    }).then(json => {
      console.log("GOOD-fetchComments", json)
      dispatch({type: "COMMENTS_SUCCESS", payload: json.comments})
    }).catch((err) => {
      console.log("ERR-fetchComments", err)
      dispatch({type: "COMMENTS_ERROR"})
    })
  }
}

export function makeComment(dispatch, getState){
  return (postId, text, taggedUsernames = [], auth) => {
    const state = getState();
    // const userId = 17
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDc5MzMyOTQsImlhdCI6MTcwNzkyMjQ5NCwic3ViIjoxN30.5p8yH6BVTGIs_MPUKXqO9CJqZz10anU1nbbg3QoyPXc"
    const {userId, token} = auth;
    const username = state.users[userId].username
    // const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/makeComment`
    const url = `${getConfig().monoServiceUrl}/makeComment`
    const params = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId,
        userId,
        taggedUsernames: taggedUsernames,
        commentText: text,
      })
    }
    fetch(url, params).then(res => {
      return res.json()
      // return res.text()
    }).then(json => {
      console.log("GOOD-makeComment", json)
      const id = json.comment_id
      const comment = {
        id,
        username,
        commentText: text,
        taggedUsernames: [],
        totalDownvotes: 0,
        totalUpvotes: 0,
        userVote: 0,
        creationTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
      }
      dispatch({type: "COMMENTS_CREATE_SUCCESS", payload: {postId, comment}});
      dispatch({type: "API_CALL_RESULT", payload: {message: "Comment has been successfully created", active: true, error: false}})
    }).catch((err) => {
      console.log("ERR-makeComment", err)
      dispatch({
        type: "API_CALL_RESULT",
        payload: {message: `Comment creation ${FAIL_MESSAGE}`, active: true, error: true}
      })
    })
  }
}

export function makePost(dispatch, getState){
  return (title, body, categories, vendors, isAnonymous, auth) => {
  // return (post, auth) => {
    const state = getState()
    console.log("AW22", auth)
    // const {title, body, categories, vendors, isAnonymous} = post
    const {userId, token} = auth;
    const rawBody = {
      userId,
      title,
      body,
      categories: categories.map(item => item.name),
      vendors, // : vendors.map(item => item.id),
      isAnonymous,
    }
    console.log("MPW", rawBody)
    // const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/makePost`
    const url = `${getConfig().monoServiceUrl}/makePost`
    const params = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(rawBody)
    }
    // makePost(title, content, selectedCategories, skills, anonymous, auth)
    // id, title, body, user, commentIds, userVote, numUpvotes, numDownvotes, createdTimestamp,
    fetch(url, params).then(res => {
      return res.json()
      // return res.text()
    }).then(json => {
      if(json.error){
        dispatch({
          type: "API_CALL_RESULT",
          payload: {message: `Post creation ${FAIL_MESSAGE}`, active: true, error: true}
        })
      }else{
        const post = {
          id: json.post_id,
          title,
          body,
          user: {
            id: userId,
            username: state.users[userId].username,
          },
          categories: categories.map(item => item.name),
          vendors, // : vendors.map(item => item.id),
          commentIds: [],
          userVote: 0,
          numComments: 0,
          numUpvotes: 0,
          numDownvotes: 0,
          createdTimestamp: new Date().toISOString(),
          updatedTimestamp: new Date().toISOString()
        }
        console.log("GOOD-makePost", json, post)
        dispatch({type: "POSTS_CREATE_SUCCESS", payload: post})
        console.log("INBETWEEN")
        dispatch({type: "API_CALL_RESULT", payload: {message: "Post has been successfully created", active: true, error: false}})
      }
    }).catch((err) => {
      console.log("ERR-makePost", err)
      dispatch({
        type: "API_CALL_RESULT",
        payload: {message: `Post creation ${FAIL_MESSAGE}`, active: true, error: true}
      })
    })
  }
}

export function upvoteComment(dispatch, getState){
  return (commentId, isUpvote) => {
    const state = getState();
    const { comments, auth } = state
    const comment = comments[commentId]
    console.log("CU_", comment.userVote, isUpvote)
    if(comment.userVote > 0 && isUpvote || comment.userVote < 0 && !isUpvote){
      console.log("CU_SHORTCIRC")
      return 
    }else{
      console.log("CU_SHOTNO")
    }
    console.log("HERE1")
    const {userId, token} = auth;
    // const userId = 17
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDc5MzMyOTQsImlhdCI6MTcwNzkyMjQ5NCwic3ViIjoxN30.5p8yH6BVTGIs_MPUKXqO9CJqZz10anU1nbbg3QoyPXc"
    // const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/upvoteComment`
    const url = `${getConfig().monoServiceUrl}/upvoteComment`
    const params = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        isDownvote: !isUpvote,
        commentId,
      }),
    }
    console.log("COMMENTSZ", url, params)
    fetch(url, params).then(res => {
      return res.json()
    }).then(json => {
      console.log("GOOD-upvoteComment", json)
      console.log(state)
      dispatch({type: "COMMENT_UPVOTE_SUCCESS", payload: {
        isUpvote,
        commentId,
      }})
    }).catch((err) => {
      console.log("ERR-upvoteComment", err)
      dispatch({
        type: "API_CALL_RESULT",
        payload: {message: `Upvote ${FAIL_MESSAGE}`, active: true, error: true}
      })
    })
  }
}