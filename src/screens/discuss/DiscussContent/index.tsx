import React from 'react';
import { Text, View, Button, StyleSheet, FlatList, TextInput } from 'react-native';
import { CategoryNames } from '../../../constants';
import { Post } from './Post';
import { getPostsWithCommentIdsAndUpvotes } from '../../../services/DiscussService';

const POST_PAGE_OFFSET = 10;

const INPUT_PLACEHOLDER = 'Share your SaaS experiences with the community';

function InputBar({navigation}){

  const [input, setInput] = React.useState('');

  const handleSetInput = (newInput) => {
    setInput(newInput);
  }

  const handleCreatePost = () => {
    navigation.navigate();
  } 

  return (
    <View>
      <TextInput 
        onChangeText={handleSetInput}
        value={input}
        placeholder={INPUT_PLACEHOLDER}
      />
      <Button title='' onPress={handleCreatePost}/>
    </View>
  )
}

export function DiscussContent(props){

  const [currentPage, setCurrentPage] = React.useState(0);
  // const [input, setInput] = React.useState('');

  // const handleSetInput = (newInput) => {
  //   setInput(newInput);
  // }

  const { currentCategory, navigation } = props;
  const posts = getPostsWithCommentIdsAndUpvotes(currentCategory, 0, POST_PAGE_OFFSET);

  console.log("Rendering Discuss")

  return (
    <View style={styles.container}>
      {/* <Text>DiscussContent2</Text>
      <Text>{currentCategory}</Text> */}
      <View style={styles.card}>
        <FlatList 
          data={posts}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({item}) => <Post {...item} />}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: "70%",
    borderColor: 'lightgrey',
    borderWidth: 1,
    margin: 16,
    padding: 8,
  },
  card: {
    margin: 0,
  },
})
