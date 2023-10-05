import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
   const { name, color } = route.params;  //Brings name and bg color selected to Chat

   useEffect(() => {
      navigation.setOptions({ title: name });
   },[]);

   return (
      <View style={[styles.container, { backgroundColor: color }]}>
         <Text style={styles.greetingText}>Hello {name} !</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   greetingText: {
      fontSize: 36, 
      fontWeight: 'bold', 
      color: '#333', 
   }
});

export default Chat;