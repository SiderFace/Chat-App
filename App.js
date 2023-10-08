import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

const App = () => {
   const firebaseConfig = {
      apiKey: "AIzaSyBglxn72w6wHLLpIeHY3VDaJCiJW2_mfq4",
      authDomain: "chat-app-50c93.firebaseapp.com",
      projectId: "chat-app-50c93",
      storageBucket: "chat-app-50c93.appspot.com",
      messagingSenderId: "953447523208",
      appId: "1:953447523208:web:9ea300d246cc0ccc04503d"
      // measurementId: " ",
   };

   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName="Start"
         >
            <Stack.Screen
               name="Start"
               component={Start}
            />
            <Stack.Screen
               name="Chat"
            >
               {props => <Chat db={db} {...props} />}
            </Stack.Screen>
         </Stack.Navigator>
      </NavigationContainer>
   );
}

export default App;