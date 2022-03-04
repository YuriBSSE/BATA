/**
 * @format
 */

 import {AppRegistry} from 'react-native';
 import App from './App';
 import {name as appName} from './app.json';
 import messaging from '@react-native-firebase/messaging';
 import PushNotification, {Importance} from 'react-native-push-notification'
 
 PushNotification.createChannel(
     {
       channelId: "channel-id", // (required)
       channelName: "My channel", // (required)
       channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
       playSound: false, // (optional) default: true
       soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
       importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
       vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
     },
     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
 );
 
 
 messaging().setBackgroundMessageHandler(async remoteMessage => {
     console.log('Message handled in the background!', remoteMessage);
   });
 AppRegistry.registerComponent(appName, () => App);
 