import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../assets/colors';
import AppStatusBar from '../components/AppStatusBar';
import Header from '../components/Header';
import LottieView from 'lottie-react-native';
import Heading from '../components/Heading';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';
import * as actions from '../store/actions/actions';
import {connect} from 'react-redux';
import AlertModal from '../components/AlertModal';
import {color} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
const {width, height} = Dimensions.get('window');

const ChangePassword = ({
  navigation,
  UserReducer,
  setErrorModal,
  change_Password,
}) => {
  const accessToken = UserReducer?.accessToken;
  const [isLoading, setIsLoading] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [showPasswordShouldBeLongAlert, setShowPasswordShouldBeLongAlert] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFieldsLeftEmptyAlert, setShowFieldsLeftEmptyAlert] =
    useState(false);
  const [showMismatchPasswordAlert, setShowMismatchPasswordAlert] =
    useState(false);

  // Save Button
  const _onPressSave = () => {
    setIsLoading(true);
    const data = {
      oldPassword: oldPass,
      newPassword: newPass,
      confirmPassword: confirmPass,
    };
    if (oldPass.length > 0 && newPass.length > 0 && confirmPass.length > 0) {
      if (newPass !== confirmPass) {
        setShowMismatchPasswordAlert(true);
      } else {
        if (newPass.length < 8 || confirmPass.length < 8) {
          setShowPasswordShouldBeLongAlert(true);
          // console.log('idher', data);
        } else {
          change_Password(data, accessToken, _onSuccessChanged);
          // console.log("tet", changePassword);
          console.log('else-----------');
        }
      }
    } else {
      setShowFieldsLeftEmptyAlert(true);
    }
    setIsLoading(false);
  };

  const _onPressShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const _onSuccessChanged = () => {
    setNewPass('');
    setOldPass('');
    setConfirmPass('');
    setShowSuccessModal(true);
  };
  // useEffect(() => {
  //   if (UserReducer?.errorModal?.status === true) {
  //     setShowErrorModal(true);
  //   }
  //   if (UserReducer?.errorModal?.status === false) {
  //     setShowErrorModal(false);
  //   }
  // }, [UserReducer?.errorModal]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        {/* <AppStatusBar
          backgroundColor={colors.themePurple1}
          barStyle="light-content"
        /> */}
        <Header title="Change Password"  navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Page Heading */}
          <Heading
            title="Change Password"
            passedStyle={styles.heading}
            fontType="semi-bold"
          />
          <Inputbox
            value={oldPass}
            isSecure={isShowPassword}
            isPassword={true}
            isShowIcon={true}
            names={'lock'}
            setTextValue={setOldPass}
            onPressIcon={_onPressShowPassword}
            passedStyle={styles.textInputStyle}
            placeholderTilte="Old Password"
            iconStyle={{
              color: colors.themePurple1,
              paddingLeft: width * 0.1,
            }}
            iconWrapperStyle={{
              position: 'absolute',
              right: width * 0.04,
              left: width * 0.7,
            }}
            placeholderTextColor="rgba(0,0,0,0.5)"
          />
          <Inputbox
            value={newPass}
            isSecure={isShowPassword}
            isPassword={true}
            isShowIcon={true}
            names={'lock'}
            setTextValue={setNewPass}
            passedStyle={styles.textInputStyle}
            onPressIcon={_onPressShowPassword}
            placeholderTilte="New Password"
            placeholderTextColor="rgba(0,0,0,0.5)"
            iconStyle={{
              color: colors.themePurple1,
              paddingLeft: width * 0.1,
            }}
            iconWrapperStyle={{
              position: 'absolute',
              right: width * 0.04,
              left: width * 0.7,
            }}
          />
          <Inputbox
            value={confirmPass}
            isSecure={isShowPassword}
            isPassword={true}
            isShowIcon={true}
            names={'lock'}
            setTextValue={setConfirmPass}
            onPressIcon={_onPressShowPassword}
            passedStyle={styles.textInputStyle}
            placeholderTilte="Confirm Password"
            placeholderTextColor="rgba(0,0,0,0.5)"
            iconStyle={{
              color: colors.themePurple1,
              paddingLeft: width * 0.1,
            }}
            iconWrapperStyle={{
              position: 'absolute',
              right: width * 0.04,
              left: width * 0.7,
            }}
          />

          <View style={styles.btnContainer}>
            {isLoading ? (
              <View style={styles.loadingComponent}>
                <Heading
                  title="Saving..."
                  passedStyle={styles.savingText}
                  fontType="semi-bold"
                />
                <LottieView
                  speed={1}
                  style={styles.lottieStyles}
                  autoPlay
                  loop
                  source={require('../assets/Lottie/purple-loading-2.json')}
                />
              </View>
            ) : (
              <Button
                title="Save Changes"
                btnStyle={styles.btnStyle}
                onBtnPress={() => _onPressSave()}
                // onBtnPress={() => console.log("pressed")}
                btnTextStyle={styles.btnTextColor}
                isBgColor={false}
              />
            )}
          </View>
          {showMismatchPasswordAlert && (
            <AlertModal
              title="Password Mismatch"
              message="New and Confirm password can not be different."
              isModalVisible={showMismatchPasswordAlert}
              setIsModalVisible={setShowMismatchPasswordAlert}
            />
          )}
          {showFieldsLeftEmptyAlert && (
            <AlertModal
              title="Oh Snaps!"
              message="One or more fields are left empty."
              isModalVisible={showFieldsLeftEmptyAlert}
              setIsModalVisible={setShowFieldsLeftEmptyAlert}
            />
          )}
          {showPasswordShouldBeLongAlert && (
            <AlertModal
              title="Oh Snaps!"
              message={'Password should be of atleast 8 characters.'}
              isModalVisible={showPasswordShouldBeLongAlert}
              setIsModalVisible={setShowPasswordShouldBeLongAlert}
            />
          )}
          {showSuccessModal && (
            <AlertModal
              title="Success!"
              message={'Password changed successfully.'}
              isModalVisible={showSuccessModal}
              setIsModalVisible={setShowSuccessModal}
            />
          )}
          {/* {showErrorModal && (
            <AlertModal
              title="Oh Snaps!"
              isModalVisible={showErrorModal}
              setIsModalVisible={setShowErrorModal}
              message={UserReducer?.errorModal?.msg}
              onPress={() => {
                setErrorModal();
                setShowErrorModal(false);
              }}
            />
          )} */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(ChangePassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  textInputStyle: {
    borderRadius: width * 0.02,
    borderWidth: 1,
    color: 'black',
    borderColor: colors.themePurple1,
    width: width * 0.9,
    fontFamily: 'Poppins-Regular',
  },
  heading: {
    color: 'black',
    marginLeft: width * 0.08,
    fontSize: width * 0.08,
    marginTop: height * 0.04,
  },

  btnStyle: {
    borderRadius: width * 0.02,
    backgroundColor: colors.themePurple1,
  },
  btnTextColor: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.045,
  },
  lottieStyles: {
    height: height * 0.15,
    position: 'absolute',
    left: width * 0.07,
    right: 0,
    // top: height * -0.02,
  },
  loadingComponent: {
    borderRadius: width * 0.02,
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.themePurple1,
    backgroundColor: colors.themePurple1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.08,
    width: width * 0.8,
    marginVertical: height * 0.02,
  },
  savingText: {
    color: 'white',
    position: 'absolute',
    left: width * 0.24,
    top: height * 0.022,
    fontSize: width * 0.045,
  },
});
