import React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
// import { TabView, SceneMap } from 'react-native-tab-view';
import { Card } from '../../components/core/Card';
import { InputBar } from '../../components/core/InputBar';
import { Separator } from '../../components/core/Separator';
import { RouteNames, INPUT_PLACEHOLDER, CategoryNames, categories, POSTS_COUNT_PER_PAGE, COMMENTS_COUNT_PER_PAGE } from '../../constants/constants';
import { colors } from '../../context/themes';
// import { getComments, getPostsWithCommentIdsAndUpvotes } from '../services/DiscussService';
import { store } from '../../state/basicStore';
import { connect } from '../../state/reduxStore';
import { mockFeedResponse } from '../../data/discussMocks';
import { Link } from '../../components/core/Link';
import { fetchComments, fetchPosts, makeComment, upvoteComment, upvotePost } from '../../services/DiscussService';
import { createUser } from '../../services/UserServices';
import { Button } from '../../components/core/Button';
import UP from '../../assets/up.png';
import SETTINGS from '../../assets/settings.png';
import UPVOTE_DEFAULT from '../../assets/upvote_default.png';
import UPVOTE_ACTIVE from '../../assets/upvote_active.png';
import DOWNVOTE_DEFAULT from '../../assets/downvote_default.png';
import DOWNVOTE_ACTIVE from '../../assets/downvote_active.png';
import moment from 'moment';
import { Heading } from '../../components/common/Heading';
import { getDateText } from '../../utils/dateTime';
import { getCount } from '../../utils/general';
import { LogoAnimated } from '../../components/animation/LogoAnimated';

const POST_PAGE_OFFSET = 10;
const COMMENT_OFFSET = 10;

function Username(){

}

// function RawComment({id, commentText, username, totalUpvotes, totalDownvotes, userVote, creationTime, navigation, upvoteComment}) {
function RawComment({commentId, navigation, comments, upvoteComment}) {

  const comment = comments[commentId];
  const {commentText, username, totalUpvotes, totalDownvotes, userVote, creationTime} = comment;
  console.log("oiuoiu", comment)
  
  const handleUsernamePress = () => {
    navigation.navigate(RouteNames.PROFILE_USER_OTHER, {username})
  }

  const handleUpvotePress = () => {
    upvoteComment(commentId, true)
  }

  const handleDownvotePress = () => {
    upvoteComment(commentId, false)
  }

  return (
    <>
      <View>
        {/* <Text style={styles.captionText}>
          {`${username} | ${creationTime}`}
        </Text> */}
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.captionText}>
            {`Reply by `}
          </Text>
          {username ? (
              <TouchableOpacity onPress={handleUsernamePress}>
                <Text style={styles.userCaption}>
                  {`@${username} `}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.captionText}>{"@User "}</Text>)} 
          <Text style={styles.captionText}>{`| ${getDateText(creationTime)}`}</Text>
        </View>
        <Text style={[styles.bodyText, styles.description]}>{commentText}</Text>
        <View style={{flexDirection: 'row', marginTop: 8}}>
          <Text style={{fontSize: 12, color: colors.textRegular}}>{`${totalUpvotes - totalDownvotes} Upvotes`}</Text>
          <TouchableOpacity onPress={handleUpvotePress} style={{marginLeft: 8}}>
            <Image source={userVote > 0 ? UPVOTE_ACTIVE : UPVOTE_DEFAULT} style={{height: 16, width: 16}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDownvotePress} style={{marginLeft: 8}}>
            <Image source={userVote < 0 ? DOWNVOTE_ACTIVE : DOWNVOTE_DEFAULT} style={{height: 16, width: 16}}  />
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}
const stp = (state) => ({
  comments: state.comments,
});
const dtp = (dispatch, getState) => ({
  upvoteComment: upvoteComment(dispatch, getState),
})
const Comment = connect(stp , dtp)(RawComment);


function CommentsList({commentIds, comments, commentsLoading, commentsError, postId, makeComment, fetchComments, navigation, auth}){

  const handleSubmitComment = (input) => {
    console.log("Commented", postId, input)
    // make API call
    // if succcessful call passed in function to store the new state
    if(input.length > 0){
      makeComment(postId, input, [], auth)
    }
  }

  const loadComments = () => {
    console.log("SOMELOGW")
    const count = getCount(commentIds, comments)
    // const hasAll = checkHasAll(commentIds, comments)
    if(count !== commentIds.length) {
      const page = Math.floor(count / COMMENTS_COUNT_PER_PAGE) + 1;
      console.log("PAGEW", page)
      fetchComments(postId, auth, page)
    }else{
      console.log("NOTTHERE")
    }
  }

  React.useEffect(() => {
    loadComments()
  }, [])
  
  const commentList = commentIds
    .map(commentId => comments[commentId])
    .filter(item => !!item)
    .toSorted((a, b) => b.id - a.id)
  console.log({commentIds, comments, commentList})

  const showLoadMore = commentIds.length !== commentList.length;

  return (
    <View>
      {/* <View
        style={{borderLeftWidth: 0.5, borderColor: colors.border, paddingLeft: 24}} 
      > */}
      <FlatList
        style={{borderLeftWidth: 0.5, borderColor: colors.border, paddingLeft: 24, marginTop: 12}}
        // style={{marginTop: 12}}
        data={commentList}
        renderItem={({item}) => {
          console.log("COMMENHJKW", item)
          return <Comment commentId={item.id} navigation={navigation}/>
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Separator style={styles.separator}/>}
      />
      {showLoadMore && (<Link onPress={loadComments} textLink={"Load More Comments..."} style={{alignSelf: 'center'}}/>)}
      <View style={{marginLeft: 32, marginRight: 32, marginTop: 16}}>
        <InputBar
          onPress={handleSubmitComment}
          // title={"^"}
          image={UP}
          imageRatio={0.8}
          placeholder={"Reply with a comment"}
          numLines={4}
        />
      </View>
      {/* </View> */}
      {commentsLoading && <ActivityIndicator style={{marginTop: 16}} />}
      {commentsError && (
        <View style={{margin: 32}}>
          <Text style={{alignSelf: 'center', color: colors.textRegular}}>{"Failed loading comments..."}</Text>
          <Link
            onPress={loadComments}
            textLink={"Retry"}
            style={{alignSelf: 'center', marginTop: 8}}
          />
        </View>
      )}

    </View>
  )
}


// makePost(title, content, selectedCategories, skills, anonymous, auth)
// id, title, body, user, commentIds, userVote, numUpvotes, numDownvotes, createdTimestamp, 
function RawPost({ id, categories, title, body, user, commentIds, userVote, numUpvotes, numDownvotes, createdTimestamp, navigation, fetchComments, makeComment, comments, commentsLoading, commentsError, upvotePost, auth}){

  const {id: userId, username} = user;

  const [commentsExpanded, setCommentsExpanded] = React.useState(false);

  const handlePostPress = () => {
    navigation.navigate(RouteNames.DISCUSS_POST_DETAIL, {postId: id})
  }

  const handleCommentsPress = () => {
    setCommentsExpanded(!commentsExpanded)
  }

  const handleUsernamePress = () => {
    navigation.navigate(RouteNames.PROFILE_USER_OTHER, {id: userId, username})
  }

  const handleUpvotePress = () => {
    upvotePost(id, true)
  }

  const handleDownvotePress = () => {
    upvotePost(id, false)
  }

  const commentCount = commentIds.length;
  const commentText = commentCount === 1 ? `${commentCount} Comment` : `${commentCount} Comments`;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePostPress}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          {categories.map((category, idx) => (<Text style={styles.captionText}>{idx === 0 ? `${category}` : `, ${category}`}</Text>))}
        </View>
        <Text style={[styles.headingText, styles.title]}>{title}</Text>
        <Text style={[styles.bodyText, styles.description]}>{body}</Text>
      </TouchableOpacity>
      <View style={styles.bottom}>
        <View style={styles.actionGroup}>
          <TouchableOpacity onPress={handleCommentsPress}>
            <Text style={[styles.linkText]}>{commentText}</Text>
          </TouchableOpacity>
            <Text style={{marginLeft: 8, fontSize: 12, color: colors.textRegular}}>{`${numUpvotes - numDownvotes} Upvotes`}</Text>
            <TouchableOpacity onPress={handleUpvotePress} style={{marginLeft: 8}}>
              <Image source={userVote > 0 ? UPVOTE_ACTIVE : UPVOTE_DEFAULT} style={{height: 16, width: 16}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDownvotePress} style={{marginLeft: 8}}>
              <Image source={userVote < 0 ? DOWNVOTE_ACTIVE : DOWNVOTE_DEFAULT} style={{height: 16, width: 16}}  />
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.captionText}>{`Posted by `}</Text>
          {username ? (<TouchableOpacity onPress={handleUsernamePress}>
            <Text style={styles.userCaption}>{`@${username} `}</Text>
          </TouchableOpacity>) : <Text style={styles.captionText}>{"@User "}</Text>} 
          <Text style={styles.captionText}>{`| ${getDateText(createdTimestamp)}`}</Text>
        </View>
      </View>
      {commentsExpanded ? 
        (<>
          <CommentsList commentIds={commentIds} comments={comments} commentsLoading={commentsLoading} commentsError={commentsError} postId={id} makeComment={makeComment} fetchComments={fetchComments} navigation={navigation} auth={auth} />
        </>) : null
      }
    </View>
  )
}

const stpPost = (state) => ({comments: state.comments, commentsLoading: state.commentsLoading, commentsError: state.commentsError, auth: state.auth});
const dtpPost  = (dispatch, getState) => ({
  fetchComments: fetchComments(dispatch),
  makeComment: makeComment(dispatch, getState),
  upvotePost: upvotePost(dispatch, getState),
})
const Post = connect(stpPost , dtpPost )(RawPost);



function RawDiscussHome(props){

  const {currentCategory, navigation, feed, posts, feedLoading, feedError, fetchPosts, auth} = props
  const postsByCategory = feed[currentCategory].map(item => posts[item])
  console.log("NEW_QZ", feed, posts, postsByCategory)
  const categoryId = categories.find(item => item.name === currentCategory) || 0

  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = React.useState(true)

  console.log("LD-feed", {ld: feedLoading[currentCategory], err: feedError[currentCategory]})

  const loadPosts = () => {
    console.log("LOADINGW1")
    const categoryId = categories.find(item => item.name === currentCategory)?.id || 0
    const postsByCategory = feed[currentCategory].map(item => posts[item])
    const page = Math.ceil(postsByCategory.length / POSTS_COUNT_PER_PAGE + 1);
    // const page = postsByCategory.length / POSTS_COUNT_PER_PAGE + 1;
    // const page = 4;
    console.log("PAGEW FUUUCK", page, postsByCategory)
    //fetchPosts(1, 1)
    // console.log("PAGEW", page)
    fetchPosts(categoryId, auth, page)
  }

  React.useEffect(() => {
    console.log("WHY DONT YOU SHOEW UP")
    const postsByCategory = feed[currentCategory].map(item => posts[item])
    if(postsByCategory.length === 0){
      console.log("WHY DONT YOU SHOEW UP 2222222222222")
      loadPosts()
    }
  }, [currentCategory])

  // console.log("PZZZ", postsByCategory)
  // console.log("E2", feedError)

  // console.log("FEED IT FUCK", feedLoading)

  console.log("NEW_REND_DISCUSS")

  return (
    <>
      {/* <Heading navigation={navigation}>
      </Heading> */}
      <Card styles={{widthX: 512, flexX: 1}}>
        <InputBar 
          onPress={(input) => {
            navigation.navigate(RouteNames.DISCUSS_CREATE_POST, { input, currentCategory })
          }}
          title={"Create Post"}
          placeholder={INPUT_PLACEHOLDER}
        />
        {/* <ScrollView style={{maxHeight: 512}}> */}
        {/* <ScrollView> */}
          {postsByCategory.length > 0 && (<FlatList 
            data={postsByCategory}
            keyExtractor={(item) => {
              return `ID${item.id}`
            }}
            renderItem={({item}) => <Post {...item} currentCategory={currentCategory} navigation={navigation} />}
            ItemSeparatorComponent={() => <Separator />}
            // initialNumToRender={3}
            // ListFooterComponent={feedLoading[currentCategory] && <ActivityIndicator style={{marginTop: 16}} />}
          />)}
        {/* </ScrollView> */}
        <Link onPress={loadPosts} textLink={"Load More Posts..."} style={{alignSelf: 'center', margin: 16}}/>
        {/* {feedLoading[currentCategory] && <ActivityIndicator style={{marginTop: 16}} />} */}
        {feedLoading[currentCategory] && <LogoAnimated timeScale={0.2} spaceScale={0.6} style={{marginTop: 16}} />}
        {feedError[currentCategory] && (<View style={{margin: 32}}>
          <Text style={{alignSelf: 'center', color: colors.textRegular}}>{"Failed loading data..."}</Text>
          <Link onPress={loadPosts} textLink={"Retry"} style={{alignSelf: 'center', marginTop: 8}}/>
        </View>)}
      </Card>
    </>
  )
}
const stpDiscussHome = (state) => ({
  feed: state.feed,
  posts: state.posts,
  feedLoading: state.feedLoading,
  feedError: state.feedError,
  auth: state.auth,
});
const dtpDiscussHome  = (dispatch) => ({
  fetchPosts: fetchPosts(dispatch), 
})
export const DiscussHome = connect(stpDiscussHome , dtpDiscussHome )(RawDiscussHome);

const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 2,
    marginTop: 16,
    marginBottom: 8,
  },
  inputContainer: {
    marginTop: 32,
  },
  captionText: {
    color: colors.textRegular,
    fontSize: 12,
  },
  userCaption: {
    color: colors.link,
    fontSize: 12,
  },
  headingText: {
    color: colors.textHighlight,
    fontSize: 12,
    fontWeight: 'bold',
  },
  bodyText: {
    color: colors.textHighlight,
    fontSize: 12,
  },
  linkText: {
    color: colors.link,
    fontSize: 12,
  },
  title: {
    marginTop: 8,
  },
  description: {
    marginTop: 8,
  },
  link: {
    marginTop: 16,
  },
  bottom: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  actionGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: 'green',
    // borderWidth: 1,
  },
  actionMember: {
    marginLeft: 16,
  },
  separator: {
    marginTop: 12,
    marginBottom: 12,
  },
  voteButton: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
    paddingBottom: 4,
    margin: 4,
    borderRadius: 2,
    fontSize: 12,
    // borderColor: 'red',
    // borderWidth: 1,
  },
})
