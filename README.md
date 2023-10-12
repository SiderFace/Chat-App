##Siders Chat App

#SPA Developer: 
Sean Siders (assisted by the CareerFoundry group)


#User Experience (current) : 
This React-Native App will be deployable on nearly all mobile devices. It will offer users a chat interface with additional options to share images and their location.


#Features : 
Chat photo sharing location sharing some customizable interface stylings


#Languages : 
React Native


#Tools :
- React Native
- Expo [cross-platform development]
- React Native Gifted Chat
- Firestore Database (firebase) [chat loggin and file storage]
- Expo Go [device-to-device connectivity for Metro bundler]
- Android Studio: Giraffe [Virtual Mobile-Device Emulation]
- Async Storage [offline viewing]


#Dependencies : 
- @react-navigation/native 
- @react-navigation/native-stack 
- @react-native-async-storage/async-storage
- @react-native-community/netinfo
- react-native-gifted-chat
- react-native-maps
- firebase/app
- firebase/auth
- firebase/firestore
- firebase/storage
- @expo/react-native-action-sheet
- expo-image-picker

 
#Local Run command : 
expo start (npx expo start)


#Setup and Initialization :

To get started with the application, follow these steps:

- Install an appropriate version of Node.  Expo only supports Node 16.xx.xx at max.  Run folowing command in your terminal ` nvm install 16.19.0 ` , ` nvm use 19.19.0 `(or change for later vercion on your choise), ` nvm alias default 16.19.0 `(only for Mac users)

- Install Expo CLI as a global npm package: ` npm install expo-cli -g `

- Create an account and log in at https://expo.dev/

- Login with your Expo account using expo login

- Install the Expo Go App from Apple Store or Google Play Store to test the project on your mobile device

- For better testing experience install Android Studio for Android Emulator or Xcode for ios Simulator to test the app

- Clone this repo and save on your local device

- Navigate to the project folder in the Terminal/PowerShell, then run ` npm install ` from within the project folder to install dependencies

- Start the project with the Metro bundler command: ` npx expo start `

- Scan the QR code or manually input the LAN location, provided in your terminal, with your mobile devices