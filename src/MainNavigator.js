import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  PermissionsAndroid,
  BackHandler,
  Platform,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import colors from './assets/colors';
import AuthRootStackScreen from './AuthRootStackScreen';
import TextSample from './components/TextSample';
import LottieView from 'lottie-react-native';
import MainAppScreens from './MainAppScreens';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import * as actions from './store/actions/actions';

function Main({UserReducer, getCurrentLocation,subscribeToTopic}) {
  const [loading, setLoading] = useState(false);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (granted) {
      getCurrentLocation();
    }
  }, [granted]);

  useEffect(() => {
    async function requestLocationPermission() {
      try {
        const platformCheck = Platform.OS
        if(platformCheck != "ios"){
          const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setGranted(granted);
        } else {
          BackHandler.exitApp();
        }
        }
      } catch (err) {
        console.warn(err);
      }
    }
    requestLocationPermission();
   
  }, []);

  useEffect(() => {
    // if (UserReducer?.isUserLogin === true) {
    //   if (UserReducer?.hasSubscribedToFCMNotification) {
    //     subscribeToTopic(UserReducer?.userData?.id?.toString());
    //   }
    // }
    subscribeToTopic(UserReducer?.userData?.id?.toString())
  }, []);

  if (loading) {
    return (
      <View style={styles.lottieContainer}>
        <StatusBar translucent backgroundColor="transparent" />
        <LottieView
          speed={2}
          style={styles.lottieStyles}
          autoPlay
          loop
          source={require('./assets/Lottie/loading.json')}
        />
        <TextSample
          Label="Loading..."
          Color="white"
          Size={hp('3.5%')}
          TextAlign="left"
          NumberOfLines={1}
          Font="Overpass-Bold"
          TextDecorationLine="none"
          TextTransform="none"
        />
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        {UserReducer?.isUserLogin === true ? (
          // token != null || userLogin?.token != null ?
          <MainAppScreens />
        ) : (
          <AuthRootStackScreen />
        )}
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  lottieContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.themePurple,
    flex: 1,
    alignContent: 'center',
  },
  lottieStyles: {
    height: '50%',
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(Main);
