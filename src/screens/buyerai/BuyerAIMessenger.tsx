import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from '../../components/core/Card';
import { InputBar } from '../../components/core/InputBar';
import { BUYERAI_PLACEHOLDER } from '../../constants/constants';
import { colors } from '../../context/themes';


export function BuyerAIMessenger(props) {

  const { navigation, route } = props;

  const {question, followup, input} = route.params;

  const quest = !!question ? `You have chosen main question ${question.title}.` : 'You have not chosen any questions';
  const follow = !!followup ? ` And followup question ${followup.title}.` : ' And no follow up questions';
  const initialReponse = `Welcome to chat. ${quest}${follow}`;

  const INIT = [
    {id: 0, userAuthor: false, content: initialReponse},
    ...!!input ? [{id: 1, userAuthor: true, content: input}] : [],
  ];

  const [messages, setMessages] = React.useState(INIT)

  React.useEffect(() => {
    if (!!input) {
      fireAIEvent();
    }
  }, [])

  const fireAIEvent = () => setTimeout(() => {
    const id = messages[messages.length - 1].id + 1;
    setMessages(messages => [...messages, {id: id, userAuthor: false, content: "random AI stuffkdjshfklsdjhflksdjflksdhakjsnfkjaskjfhsn"}])
  }, 2000);

  const handleTalkToChat = (input) => {
    if(input?.length > 0) {
      const id = messages[messages.length - 1].id + 1;
      // TODO shouln't it be setMessages(messages => [...messages, {id, userAuthor: true, content: input}])
      setMessages([...messages, {id, userAuthor: true, content: input}])
      fireAIEvent();
    }
  }

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.title}>
        Buyer AI
      </Text>
      <Text style={{color: colors.textRegular, margin: 8,}}>
        Simplyfying Software Selection with Smarter Solutions
      </Text>
      <Card styles={{marginBottom: 32, padding: 16, marginTop: 8}}>
        <Text style={{color: colors.textHighlight, alignSelf: 'center'}}>
          You are now chatting with BuyerjourneyAI
        </Text>
        {
          messages.map(message => {
            const styled = {
              maxWidth: 256,
              color: colors.textHighlight,
              backgroundColor: colors.link,
              fontSize: 12,
              padding: 8,
              marginTop: 16,
              borderRadius: 4
            };
            return (
              <>
                <Text style={[styled, message.userAuthor ? {alignSelf: 'flex-end', backgroundColor: colors.foreground, borderWidth: 1, borderColor: colors.link} : {}]}>
                  {message.content}
                </Text>
              </>
            )
          })
        }
        <InputBar
          onPress={handleTalkToChat}
          title={"^"}
          placeholder={BUYERAI_PLACEHOLDER}
          style={{marginTop: 16, width: 512}}
        />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: colors.textHighlight,
    marginTop: 32,
    fontSize: 18,
    // fontWeight: 'bold',
  }
});
