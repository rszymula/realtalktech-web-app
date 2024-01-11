import React from 'react';
import { Text, View, Button, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '../../context/themes';

// export function Card({children, style}){
export function Card({children}){
  return (
    // <View style={[styles.card, style]}>
    <View style={styles.card}>
      {children}
    </View>
  )
}

export function CreatePostScreen(props){

  const [category, setCategory] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const { navigation } = props;

  const handleCreatePost = () => {
    const postData  = {
      category,
      title,
      content,
    };
    // make API call
    // if API call successful, call passed in function that updates state
    handleExit();
  }

  const handleExit = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Card>
        {/* <Text>CreatePostScreen</Text> */}
        {/* <Button title={"X"} onPress={handleExit}/> */}
        <Card>
          <View style={styles.labeledInput}>
            <Text style={styles.label}>Category</Text>
            <TextInput 
              style={styles.input}
              onChangeText={setCategory}
              value={category}
            />
          </View>
        </Card>
        <Card>
          <View style={styles.labeledInput}>
            <Text style={styles.label}>Title</Text>
            <TextInput 
              style={styles.input}
              onChangeText={setTitle}
              value={title}
            />
          </View>
        </Card>
        <Card>
          {/* <View style={styles.textbox}> */}
            <TextInput 
              onChangeText={setContent}
              value={content}
              multiline={true}
              numberOfLines={12}
              style={styles.textbox}
            />
          {/* </View> */}
        </Card>
        {/* <Pressable onPress={handleExit}>
          <Text style={styles.exit}>
            {"X"}
          </Text>
        </Pressable> */}
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={[styles.button, {backgroundCcolor: colors.input, color: 'white'}]}> */}
          <TouchableOpacity onPress={handleExit}>
            <Text style={[styles.button, {backgroundColor: colors.input, color: 'white'}]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreatePost}>
            <Text style={styles.button}>Create Post</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    borderWidth: 2,
    padding: 16,
    backgroundColor: colors.background
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    margin: 16,
    backgroundColor: colors.foreground,
  },
  exit: {
    color: colors.textRegular,
    alignSelf: 'flex-end',
    paddingRight: 8,
  },
  labeledInput: {
    flexDirection: 'row',
    backgroundColor: colors.input,
  },
  label: {
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    color: colors.textHighlight,
  },
  input: {
    width: "100%",
  },
  textbox: {
    // height: 200,
    color: colors.textHighlight,
    padding: 8,
  },
  buttonContainer: {
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.link,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 32,
    borderWidth: 1,
    borderColor: colors.link,
    borderRadius: 4,
    fontSize: 12,
  },

})
