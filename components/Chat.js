import { useState, useEffect } from 'react';
import { 
   StyleSheet, 
   View,  
   KeyboardAvoidingView, 
   Platform 
} from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
   collection,
   addDoc,
   onSnapshot,
   getDocs,
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
   const { name, color, userID } = route.params;
   const [messages, setMessages] = useState([])

   const onSend = (newMessages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
   }

   useEffect(() => {
      const messagesRef = collection(db, "messages");
      const newMessage = {
         text: "Hello, Firebase!",
         createdAt: new Date(),
         user: {
            _id: "user_id",
            name: "John Doe",
         },
      };      
      addDoc(messagesRef, newMessage);

      const unsubMessages = onSnapshot(messagesRef, (querySnapshot) => {
        const newMessages = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
               _id: doc.id,
               text: data.text,
               createdAt: data.createdAt.toDate(),
               user: {
                  _id: data.user._id,
                  name: data.user.name,
                  avatar: data.user.avatar,
               },
            };
         });
  
      newMessages.sort((a, b) => b.createdAt - a.createdAt);
        setMessages(newMessages);
      });
  
      return () => {
        if (unsubMessages) unsubMessages();
      }
   }, [db]);

   const renderBubble = (props) => {
      return (
         <Bubble
            {...props}
            wrapperStyle={{
               right: {
                  backgroundColor: '#6699A1'
               },
               left: {
                  backgroundColor: '#F2EFEA'
               }
            }}
         />
      )
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