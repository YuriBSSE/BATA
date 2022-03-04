import React, {useEffect, useState} from 'react';
import Payment from './screens/Payment';
import Settings from './screens/Settings';
import CustomDrawer from './CustomDrawer';
import BookingHistory from './screens/BookingHistory';
import HomeScreensStack from './HomeScreensStack';
import * as actions from './store/actions/actions';
import messaging from '@react-native-firebase/messaging';
import PushNotifications from './screens/PushNotifications';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import PushNotification from 'react-native-push-notification';
const Drawer = createDrawerNavigator();

const MainAppScreens = ({
  getCurrentLocation,
  getCurrentBooking,
  UserReducer,clearCurrentBooking,
  getAllLanguages,
}) => {
  const initialRoute = 'Home';
  const [loading, setLoading] = useState(false);
  const accessToken = UserReducer?.accessToken;

  // async function registerAppWithFCM() {
  //   const c =  await messaging().registerDeviceForRemoteMessages();
  //   console.log(c, "SADASDASDASDASDASD")
  //   if(c){
  //    alert("ASDASD")
  //   }
  //  }

  const routes = [
    {
      id: 1,
      iconName: 'home',
      iconType: 'Entypo',
      routeName: 'Home',
    },
    // {
    //   id: 2,
    //   iconName: 'dollar-bill',
    //   iconType: 'Foundation',
    //   routeName: 'payment',
    // },
    // {
    //   id: 3,
    //   iconName: 'package',
    //   iconType: 'Feather',
    //   routeName: 'subscription',
    // },
    {
      id: 3,
      iconName: 'history',
      iconType: 'FontAwesome',
      // routeName: 'history',
      routeName: 'history',
    },
    {
      id: 4,
      iconName: 'bell',
      iconType: 'MaterialCommunityIcons',
      // routeName: 'push notifications',
      routeName: 'push notifications',
    },
    {
      id: 5,
      iconName: 'settings-sharp',
      iconType: 'Ionicons',
      // routeName: 'settings',
      routeName: 'settings',
    },
  ];

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('FCM Authorization:', authStatus);
    }
  };

  useEffect(() => {
    // registerAppWithFCM()
    try {
      messaging()
      .getToken()
      .then(token => {
        console.log('TOKEN: : : : :  :', token);
        // setFCMToken(token);
      });
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
        });

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log(remoteMessage, 'sadasdasd');

        // Call api to get current booking data
        if (remoteMessage?.data?.type == 'accepted') {
          getCurrentBooking(accessToken, () => {});
        }
        if (remoteMessage?.data?.type == 'reject') {
          clearCurrentBooking();
        }

        if (remoteMessage.notification) {
          PushNotification.localNotification({
            channelId: 'channel-id',
            channelName: 'My channel',
            message: remoteMessage.notification.body,
            playSound: true,
            title: remoteMessage.notification.title,
            priority: 'high',
            soundName: 'default',
          });
        }
      });
      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    // getCurrentLocation();
    requestUserPermission();
    getAllLanguages();
  }, []);

  if (loading) {
    return null;
  } else {
    return (
      <>
        <Drawer.Navigator
          initialRouteName={initialRoute}
          screenOptions={{headerShown: false}}
          drawerContent={props => {
            return (
              <CustomDrawer
                navigation={props.navigation}
                routes={routes}
                drawerRoutes={props.state.routeNames}
              />
            );
          }}>
          <Drawer.Screen name="home" component={HomeScreensStack} />
          <Drawer.Screen name="payment" component={Payment} />
          <Drawer.Screen name="settings" component={Settings} />
          {/* <Drawer.Screen name="subscription" component={Subscription} /> */}
          <Drawer.Screen name="history" component={BookingHistory} />
          <Drawer.Screen
            name="push notifications"
            component={PushNotifications}
          />
        </Drawer.Navigator>
      </>
    );
  }
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(MainAppScreens);
