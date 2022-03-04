import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppStatusBar from '../components/AppStatusBar';
import colors from '../assets/colors';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
import {connect} from 'react-redux';
import * as actions from '../store/actions/actions';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const PushNotifications = ({
  navigation,
  UserReducer,
  subscribeToTopic,
  unSubscribeFromTopic,
  getAllLanguages,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Toggle Notifications Function
  const _onPressToggleNotificationSubscription = async () => {
    setIsLoading(true);
    // setTimeout(async () => {
      if (UserReducer?.hasSubscribedToFCMNotification) {
        await unSubscribeFromTopic(UserReducer?.userData?.id);
      } else {
        await subscribeToTopic(UserReducer?.userData?.id);
      }
      setIsLoading(false);
    // }, 2000);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        {/* <AppStatusBar
          backgroundColor={colors.themePurple1}
          barStyle="light-content"
        /> */}
        <Header title="Notifications" navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Page Heading */}
          <Heading
            title="Push Notifications"
            passedStyle={styles.heading}
            fontType="semi-bold"
          />

          <View
            style={{
              borderRadius: width * 0.02,
              borderColor: colors.themePurple1,
              borderWidth: 1,
              padding: 10,
              height: height * 0.08,
              marginHorizontal: width * 0.05,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Heading
                title="Tap to toggle Notifications"
                fontType={'semi-bold'}
                passedStyle={{
                  fontSize: width * 0.04,
                  color: 'black',
                  position: 'absolute',
                  top: height * 0.006,
                }}
              />
              {isLoading ? (
                <LottieView
                  speed={1}
                  style={styles.lottieStyles}
                  autoPlay
                  loop
                  source={require('../assets/Lottie/purple-loading-2.json')}
                />
              ) : (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    _onPressToggleNotificationSubscription();
                  }}
                  style={{
                    position: 'absolute',
                    right: width * 0.01,
                    top: height * 0.0005,
                  }}>
                  {UserReducer?.hasSubscribedToFCMNotification ? (
                    <IconComp
                      type={'FontAwesome'}
                      iconStyle={{
                        fontSize: width * 0.1,
                        color: colors.themePurple1,
                      }}
                      name="toggle-on"
                    />
                  ) : (
                    <IconComp
                      type={'FontAwesome'}
                      iconStyle={{
                        fontSize: width * 0.1,
                        color: colors.themePurple1,
                      }}
                      name="toggle-off"
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(PushNotifications);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    color: 'black',
    marginLeft: width * 0.08,
    fontSize: width * 0.08,
  },
  lottieStyles: {
    height: height * 0.14,
    position: 'absolute',
    left: width * 0.24,
    right: 0,
    // top: height * -0.025,
  },
});
