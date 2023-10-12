import { useState, useEffect } from 'react';
import { 
   StyleSheet, 
   View,  
   KeyboardAvoidingView, 
   Platform,
   Alert 
} from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import {
   collection,
   addDoc,
   onSnapshot,
   orderBy,
   query
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';


const Chat = (
   { 
      route, 
      navigation, 
      db, 
      isConnected,
      storage 
   }
) => 
{

   const { name, color, userId, } = route.params;
   const [messages, setMessages] = useState([]);

   let unsubMessages;
   const loadCachedMessages = async () => {
      const cachedMessages = await AsyncStorage.getItem('messages') || '[]';
      setMessages(JSON.parse(cachedMessages));
   };

   const cacheMessages = async (messages) => {
      try {
         await AsyncStorage.setItem('messages', JSON.stringify(messages));
      } catch (error) {
         console.error('Error caching messages:', error);
      }
   };

   const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0])
   }

   useEffect(() => {
      navigation.setOptions({ title: name });

      if (isConnected === true) {
         if (unsubMessages) unsubMessages();
         unsubMessages = null;

         const q = query(
            collection(db, "messages"), 
            orderBy("createdAt", "desc")
         );
         unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach(doc => {
                  newMessages.push({
                     _id: doc.id,
                     ...doc.data(),
                     createdAt: new Date(doc.data().createdAt.toMillis())
                  })
               })
            cacheMessages(newMessages);
            setMessages(newMessages);
         });
      } else loadCachedMessages();

      return () => {
         if (unsubMessages) unsubMessages();
      }
   }, [db, isConnected]);


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

   const renderCustomActions = (props) => {
      return <CustomActions 
         {...props} 
         storage={storage}
      />;
   };

   const renderInputToolbar = (props) => {
      if (isConnected) 
      return <InputToolbar 
         {...props} 
      />; else return null;
   }

   const renderCustomView = (props) => {
      const { currentMessage} = props;
      if (currentMessage.location) {
         return (
            <MapView
               style={{
                  width: 150,
                  height: 100,
                  borderRadius: 13,
                  margin: 3
               }}
               region={{
                  latitude: currentMessage.location.latitude,
                  longitude: currentMessage.location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
               }}
            />
         );
      }
      return null;
   }


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
            renderInputToolbar={renderInputToolbar}
            renderActions={renderCustomActions}
            renderCustomView={renderCustomView}
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