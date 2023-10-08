import React, { useState } from 'react';
import { 
   StyleSheet, 
   View, 
   Text, 
   TextInput, 
   ImageBackground, 
   TouchableOpacity, 
   ScrollView,
   Alert 
} from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const image = require('../assets/Background_Image.png');

const colorOptions = {
   earthGray:  '#A39E93',
   earthGreen: '#87A96B',
   earthBrown: '#A28474',
   earthRed:   '#D9837E',
};

const Start = ({ navigation }) => {
   const [name, setName] = useState(' ');
   const [color, setColor] = useState(colorOptions.earthGray);
   const auth = getAuth();

   const signInUser = () => {
      signInAnonymously(auth)
         .then(result => {
            navigation.navigate("Chat", { userId: result.user.uid, name, color:color, });
            Alert.alert("Signed in");
         })
         .catch((error) => {
            Alert.alert("There was a problem with the sign in. Please try again later.", error);
         })
   }

   return (
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>         
         <ScrollView contentContainerStyle={styles.container}>

         <Text style={styles.title}>Chat App</Text>

         <View style={styles.textContainer}>
            <TextInput
               style={styles.textInput}
               value={name}
               onChangeText={setName}
               placeholder="Username"
               placeholderTextColor="#333"
            />

            <Text style={styles.colorSelectText}>Select Background Color :</Text>

            <View style={styles.colorSelect}>
               <TouchableOpacity
                  style={[
                     styles.circle,
                     color === colorOptions.earthGray && styles.selectedCircle,
                     { backgroundColor: colorOptions.earthGray },
                  ]}
                  onPress={() => setColor(colorOptions.earthGray)}
               />
               <TouchableOpacity
                  style={[
                     styles.circle,
                     color === colorOptions.earthGreen && styles.selectedCircle,
                     { backgroundColor: colorOptions.earthGreen },
                  ]}
                  onPress={() => setColor(colorOptions.earthGreen)}
               />
               <TouchableOpacity
                  style={[
                     styles.circle,
                     color === colorOptions.earthBrown && styles.selectedCircle,
                     { backgroundColor: colorOptions.earthBrown },
                  ]}
                  onPress={() => setColor(colorOptions.earthBrown)}
               />
               <TouchableOpacity
                  style={[
                     styles.circle,
                     color === colorOptions.earthRed && styles.selectedCircle,
                     { backgroundColor: colorOptions.earthRed },
                  ]}
                  onPress={() => setColor(colorOptions.earthRed)}
               />
            </View>

            <TouchableOpacity
               style={styles.button}
               onPress={signInUser}
            >
               <Text style={styles.buttonText}>Start Chat</Text>
            </TouchableOpacity>
         </View>
         </ScrollView>
      </ImageBackground>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
   },
   image: {
      flex: 1,
      justifyContent: 'space-between',
      padding: '6%',
   },
   title: {
      fontSize: 45,
      fontWeight: '600',
      color: '#333',
      alignSelf: 'center',
   },
   textContainer: {
      padding: '6%',
      paddingBottom: 20,
   },
   textInput: {
      fontSize: 16,
      fontWeight: '700',
      color: '#333',
      padding: 15,
      borderWidth: 5,
      borderColor: '#757083',
      marginTop: 15,
      marginBottom: 15,
   },
   colorSelectText: {
      fontSize: 16,
      fontWeight: '900',
      color: '#333',
      marginBottom: 10,
   },
   colorSelect: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
   },
   circle: {
      height: 50,
      width: 50,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: '#757083'
   },
   selectedCircle: {
      borderWidth: 2,
      borderColor: '#FF6B6B',
   },
   button: {
      backgroundColor: '#A1917E',
      padding: 10,
      borderWidth: 3,
      borderColor: '#333',
   },
   buttonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center',
   },
});

export default Start;