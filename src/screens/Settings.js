import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import CancelSubscriptionModal from '../components/CancelSubscriptionModal';
import AppStatusBar from '../components/AppStatusBar';
import colors from '../assets/colors';
import * as actions from '../store/actions/actions';
import IconComp from '../components/IconComp';
import Heading from '../components/Heading';
import {connect} from 'react-redux';
import AlertModal from '../components/AlertModal';
const {width, height} = Dimensions.get('window');

const Settings = ({navigation, UserReducer, cancelSubscription}) => {
  const accessToken = UserReducer?.accessToken;
  // const currentBooking = {};
  const currentBooking = UserReducer?.currentBooking;
  const [isLoading, setIsLoading] = useState(false);
  const packageDetails = UserReducer?.userData?.current_package;
  const [showCancelSubscriptionModal, setShowCancelSubscriptionModal] =
    useState(false);
  const [showSuccessCancellationAlert, setShowSuccessCancellationAlert] =
    useState(false);
  const [showNotAllowed, setShowNotAllowed] = useState(false);

  // Close Success Cancellation Alert
  const _openSuccessCancellationAlert = () => {
    setShowCancelSubscriptionModal(false);
    setShowSuccessCancellationAlert(true);
  };
  // Cancel Subscription
  const _onPressCancelSubscription = async () => {
    setIsLoading(true);
    await cancelSubscription(
      packageDetails?.id,
      accessToken,
      _openSuccessCancellationAlert,
    );
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        {/* <AppStatusBar
          backgroundColor={colors.themePurple1}
          barStyle="light-content"
        /> */}

        <Header title="Settings" navigation={navigation} />
        <Heading
          title="Settings"
          passedStyle={styles.heading}
          fontType="semi-bold"
        />
        {/* Change Password */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}
          style={styles.btnContainer}>
          <IconComp
            name={'lock'}
            type={'MaterialCommunityIcons'}
            iconStyle={styles.btnIconStyle}
          />
          <Heading passedStyle={styles.btnText} title={'Change Password'} />
        </TouchableOpacity>

        {/* Cancel Subscription  */}
        {UserReducer?.userData?.current_package !== null && (
          <TouchableOpacity
            onPress={() => {
              if (currentBooking == undefined || currentBooking === null) {
                setShowCancelSubscriptionModal(true);
              } else {
                setShowNotAllowed(true);
              }
            }}
            style={styles.btnContainer}>
            <IconComp
              name={'table-cancel'}
              type={'MaterialCommunityIcons'}
              iconStyle={styles.btnIconStyle}
            />
            <Heading
              passedStyle={styles.btnText}
              title={'Cancel Subscription'}
            />
          </TouchableOpacity>
        )}
        {showCancelSubscriptionModal && (
          <CancelSubscriptionModal
            isLoading={isLoading}
            packageDetails={packageDetails}
            onPressCancelSubscription={_onPressCancelSubscription}
            isModalVisible={showCancelSubscriptionModal}
            setIsModalVisible={setShowCancelSubscriptionModal}
          />
        )}
        {showSuccessCancellationAlert && (
          <AlertModal
            title="Success!"
            message={`Your subscription has been cancelled.`}
            isModalVisible={showSuccessCancellationAlert}
            setIsModalVisible={setShowSuccessCancellationAlert}
          />
        )}

        {showNotAllowed && (
          <AlertModal
            title="Woah!"
            message={
              'Packages are not allowed to be cancelled or upgraded while you have a booking.'
            }
            isModalVisible={showNotAllowed}
            setIsModalVisible={setShowNotAllowed}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.016,
  },
  btnIconStyle: {
    fontSize: width * 0.07,
    color: 'black',
    paddingHorizontal: width * 0.06,
  },
  btnText: {
    color: 'black',
    fontSize: width * 0.045,
    textTransform: 'capitalize',
  },
  heading: {
    color: 'black',
    marginLeft: width * 0.08,
    fontSize: width * 0.08,
  },
});
