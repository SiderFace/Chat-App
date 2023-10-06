import { useState, useEffect } from 'react';
import { 
   StyleSheet, 
   View,  
   KeyboardAvoidingView, 
   Platform 
} from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
   const { name, color } = route.params;
   const [messages, setMessages] = useState([])

   const onSend = (newMessages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
   }

   const renderBubble = (props) => {
      return <Bubble
         {...props}
         wrapperStyle={{
            right: {
               backgroundColor: '#A1917E'
            },
            left: {
               backgroundColor: '#F2EFEA'
            }
         }}
      />
   }

   useEffect(() => {
      navigation.setOptions({ 
         title: `${name}'s Chat Room` 
      });
   },[]);

   useEffect(() => {
      setMessages([
         {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
               _id: 2,
               name: 'React Native',
               avatar: 'https://placeimg.com/140/140/any',
            },
         },
         {
            _id: 2,
            text: `${name} has entered the room}`,
            createdAt: new Date(),
            system: true,
         }
      ]);
   },[]);
  

   return (
      <View style={[styles.container, { backgroundColor: color }]}>
         <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            onSend={messages => onSend(messages)}
            user={{
               _id: 1
            }}
         />
         { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
   },
   greetingText: {      
      fontSize: 16,
      fontWeight: '300',
      color: '#333',
      marginBottom: 10,
   },
});

export default Chat;