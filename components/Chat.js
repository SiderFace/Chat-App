import { useState, useEffect } from 'react';
import { 
   StyleSheet, 
   View,  
   KeyboardAvoidingView, 
   Platform,
   Alert 
} from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
   collection,
   addDoc,
   onSnapshot,
   orderBy,
   query
} from "firebase/firestore";

const Chat = ({ route, navigation, db, }) => {
   const { name, color, userId, } = route.params;
   const [messages, setMessages] = useState([])

   const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0])
    }

   useEffect(() => {
      navigation.setOptions({ title: name });

      const q = query(
         collection(db, "messages"), 
         orderBy("createdAt", "desc")
      );
      const unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
            newMessages.push({
               _id: doc.id,
               ...doc.data(),
               createdAt: new Date(doc.data().createdAt.toMillis())
            })
         })
         setMessages(newMessages);
      })

      return () => {
         if (unsubMessages) unsubMessages();
      }
   }, [db]);

   // const bubbleColors = ['#6699A1', '#FF6B6B', '#87A96B', '#D9837E'];
   const renderBubble = (props) => {
      const isCurrentUser = props.currentMessage.user._id === userId;
      const backgroundColor = isCurrentUser ? '#e3d3c5' : '#3b5869';
      const position = isCurrentUser ? 'right' : 'left';
      const textColor = isCurrentUser ? 'black' : 'white';
    
      return (
         <Bubble
            {...props}
            wrapperStyle={{
               [position]: {
               backgroundColor: backgroundColor,
               },
            }}
            position={position}
            textStyle={{
               left: { color: textColor }, 
               right: { color: textColor },
            }}
         />
      );
   };

   useEffect(() => {
      navigation.setOptions({ 
         title: `${name}'s Chat Room` 
      });
   },[]);

   useEffect(() => {
      if (messages.length === 0) {
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
               text: `${name} has entered the room`,
               createdAt: new Date(),
               system: true,
            }
         ]);
      }
   },[messages, name]); 

   return (
      <View style={[styles.container, { backgroundColor: color }]}>
         <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            onSend={messages => onSend(messages)}
            user={{
               _id: userId,
               name: name,
             }}
         />
         { Platform.OS === 'android' ? (
            <KeyboardAvoidingView behavior="height" />
         ) : null}
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