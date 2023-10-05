import React, { useState } from 'react';
import { StyleSheet, 
   View, 
   Text, 
   TextInput, 
   ImageBackground, 
   TouchableOpacity, 
   ScrollView 
} from 'react-native';

const image = require('../assets/xu2eCuW9-Evon-1440x900.jpg');

const colorOptions = {
   earthGray: '#A39E93',
   earthGreen: '#87A96B',
   earthBrown: '#A28474',
   earthRed: '#D9837E',
};

const Start = ({ navigation }) => {
   const [name, setName] = useState(' ');
   const [color, setColor] = useState(colorOptions.a);

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
               placeholderTextColor="#757083"
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
               onPress={() => navigation.navigate('Chat', { name: name, color: color })}
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
      backgroundColor: '#F2EFEA',
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
      backgroundColor: '#FFFFFF',
      padding: '6%',
      paddingBottom: 20,
   },
   textInput: {
      fontSize: 16,
      fontWeight: '300',
      color: '#8A95A5',
      padding: 15,
      borderWidth: 1,
      borderColor: '#757083',
      marginTop: 15,
      marginBottom: 15,
   },
   colorSelectText: {
      fontSize: 16,
      fontWeight: '300',
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
   },
   selectedCircle: {
      borderWidth: 2,
      borderColor: '#FF6B6B',
   },
   button: {
      backgroundColor: '#A1917E',
      padding: 10,
   },
   buttonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center',
   },
});

export default Start;