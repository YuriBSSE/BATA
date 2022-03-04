import React, {useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../assets/colors';
import Button from '../components/Button';
import Heading from '../components/Heading';
import LottieView from 'lottie-react-native';
import Inputbox from '../components/Inputbox';
import * as actions from '../store/actions/actions';
import AppStatusBar from '../components/AppStatusBar';
import background_img from '../assets/background_img.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {connect} from 'react-redux';
import AlertModal from '../components/AlertModal';
import {useIsFocused} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ForgetPassword = ({
  UserReducer,
  navigation,
  resetPassword,
  setErrorModal,
  requestOtpForResetPassword,
  verifyResetPasswordOtpCode,
}) => {
  const phoneInput = useRef(null);
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [showVerificationFailedModal, setShowVerificationFailedModal] =
    useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isRequestingCode, setIsRequestingCode] = useState(false);
  const [isResetingPassword, setIsResetingPassword] = useState(false);
  const [showConfirmChangeModal, setShowConfirmChangeModal] = useState(false);
  const [showNoPhoneModal, setShowNoPhoneModal] = useState(false);
  const [showPasswordMismatchModal, setShowPasswordMismatchModal] =
    useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const isFocused = useIsFocused();
  const [showPasswordShouldBeLongAlert, setShowPasswordShouldBeLongAlert] =
    useState(false);

  const _onPressShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  
  //STEP 1 FUNCTION CALL
  const _onPressSubmitNumber = async () => {
    if (!phone.length > 0) {
      setShowNoPhoneModal(true);
    } else {
      setIsRequestingCode(true);
      await requestOtpForResetPassword(phone, _onSuccess);
      setIsRequestingCode(false);
    }
    setIsRequestingCode(false);
  };

  const _onSuccess = () => {
    setStep(step + 1);
  };

  // STEP 2 FUNCTION CALL
  const _verifyOtpCode = async code => {
    setIsVerifyingCode(true);
    await verifyResetPasswordOtpCode(
      {
        phone: phone,
        code: code,
      },
      _onSuccess,
      _onFailureVerifyOtp,
    );
    setIsVerifyingCode(false);
  };

  const _onFailureVerifyOtp = () => {
    setShowVerificationFailedModal(true);
  };

  // STEP 3 FUNCTION CALL
  const _resetPassword = async () => {
    if (newPassword?.length < 8 || confirmPassword?.length < 8) {
      setShowPasswordShouldBeLongAlert(true);
    } else {
      if (newPassword === confirmPassword) {
        setIsResetingPassword(true);
        await resetPassword({
          userId: UserReducer?.userData?.id,
          password: newPassword,
          confirmPassword: confirmPassword,
        },_onSuccessPasswordChange);
        setIsResetingPassword(false);
      } else {
        setShowPasswordMismatchModal(true);
      }
    }
  };

  const _onSuccessPasswordChange = () => {
    setShowConfirmChangeModal(true);

  }
  const _onPressRequestNewOtpCode = async () => {
    setIsRequestingCode(true);
    await requestOtpForResetPassword(phone, () => {});
    setIsRequestingCode(false);
    setShowVerificationFailedModal(false);
    setOtpCode('');
  };

  useEffect(() => {
    if (UserReducer?.errorModal?.status === true) {
      setShowErrorModal(true);
    }
    if (UserReducer?.errorModal?.status === false) {
      setShowErrorModal(false);
    }
  }, [UserReducer?.errorModal]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EF2692'}}>
      {/* <AppStatusBar
        backgroundColor={colors.themePurple1}
        barStyle="light-content"
      /> */}
      <ImageBackground source={background_img} style={styles.image}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: height * 0.15,
          }}>
          {step === 1 && (
            <>
              <Heading title="Forget Password" passedStyle={styles.heading} />
              <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="US"
              layout="first"
              placeholder="Phone"
              containerStyle={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: width * 0.045,
                color: 'white',
                height: height * 0.0753,
                marginVertical: height * 0.02,
              }}
              // flagButtonStyle={{
              //   // backgroundColor: 'red',
              //   width: width * 0.2,
              // }}
              // countryPickerButtonStyle={{
              //   // backgroundColor: 'red',
              //   // paddingRight: 10,
              // }}
              textInputStyle={{
                color: 'white',
                fontSize: width * 0.045,
                paddingVertical: 0,
              }}
              codeTextStyle={{
                color: 'white',
                fontSize: width * 0.045,
              }}
              textContainerStyle={{
                backgroundColor: 'transparent',
                // backgroundColor:'red',
                //  height: height * 0.09,
                color: 'white',
                // paddingVertical: 5,
              }}
              onChangeText={text => {
                setValue(text);
              }}
              onChangeFormattedText={text => {
                setPhone(text);
              }}
              withDarkTheme
            />
              {/* <Inputbox
                value={phone}
                setTextValue={setPhone}
                placeholderTilte="Phone Number"
                isShowIcon={true}
                keyboardType={'numeric'}
                names={'smartphone'}
              /> */}
              {isRequestingCode ? (
                <View style={styles.loadingComponent}>
                  <LottieView
                    speed={1}
                    style={styles.lottieStylesButton}
                    autoPlay
                    colorFilters={'blue'}
                    loop
                    source={require('../assets/Lottie/purple-loading-2.json')}
                  />
                </View>
              ) : (
                <Button
                  title="Submit"
                  onBtnPress={() => _onPressSubmitNumber()}
                  btnStyle={{
                    borderRadius: width * 0.08,
                    backgroundColor: 'white',
                    paddingVertical: height * 0.015,
                  }}
                  btnTextStyle={{
                    color: colors.themePurple1,
                    fontFamily: 'Poppins-SemiBold',
                  }}
                  isBgColor={false}
                />
              )}
            </>
          )}
          {step === 2 &&
            (isVerifyingCode ? (
              <View style={styles.verifyingView}>
                <Heading
                  title="Verifying OTP Code"
                  passedStyle={styles.verifyingOtpCode}
                  fontType="light"
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
              <View style={styles.inputBoxes}>
                <Heading title="Enter OTP Code" passedStyle={styles.heading} />
                <OTPInputView
                  style={{width: '80%', height: 100}}
                  pinCount={4}
                  code={otpCode}
                  onCodeChanged={code => {
                    setOtpCode(code);
                  }}
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={code => {
                    _verifyOtpCode(code);
                  }}
                />
              </View>
            ))}
          {step === 3 && (
            <>
              <Heading title="Reset Password" passedStyle={styles.heading} />

              {/*New Password  */}
              <Inputbox
                value={newPassword}
                setTextValue={setNewPassword}
                placeholderTilte="New Password"
                isSecure={!isShowPassword}
                isPassword={true}
                isShowIcon={true}
                names={'lock'}
                onPressIcon={_onPressShowPassword}
                iconStyle={{
                  color: 'white',
                  paddingLeft: width * 0.006,
                }}
                iconWrapperStyle={{
                  position: 'absolute',
                  right: width * 0.04,
                  left: width * 0.7,
                }}
              />

              {/* Confirm Password  */}
              <Inputbox
                value={confirmPassword}
                setTextValue={setConfirmPassword}
                placeholderTilte="Confirm Password"
                isSecure={!isShowPassword}
                isPassword={true}
                isShowIcon={true}
                names={'lock'}
                onPressIcon={_onPressShowPassword}
                iconStyle={{
                  color: 'white',
                  paddingLeft: width * 0.006,
                }}
                iconWrapperStyle={{
                  position: 'absolute',
                  right: width * 0.04,
                  left: width * 0.7,
                }}
              />
              {isResetingPassword ? (
                <TouchableOpacity
                  style={styles.loadingComponent}
                  activeOpacity={1}>
                  <LottieView
                    speed={1}
                    style={styles.lottieStylesButton}
                    autoPlay
                    colorFilters={'blue'}
                    loop
                    source={require('../assets/Lottie/purple-loading-2.json')}
                  />
                </TouchableOpacity>
              ) : (
                <Button
                  title="Reset"
                  onBtnPress={() => _resetPassword()}
                  btnStyle={{
                    borderRadius: width * 0.08,
                    backgroundColor: 'white',
                    paddingVertical: height * 0.015,
                  }}
                  btnTextStyle={{
                    color: colors.themePurple1,
                    fontFamily: 'Poppins-SemiBold',
                  }}
                  isBgColor={false}
                />
              )}
            </>
          )}
        </View>

        {showVerificationFailedModal && (
          <AlertModal
            buttonText={'Request New Code'}
            title="Verification Failed :("
            onPress={_onPressRequestNewOtpCode}
            showLoader={isRequestingCode}
            isModalVisible={showVerificationFailedModal}
            setIsModalVisible={setShowVerificationFailedModal}
            message="Something went wrong in verification process."
          />
        )}

        {showConfirmChangeModal && (
          <AlertModal
            buttonText={'Login Now'}
            title="Success!"
            onPress={() => {
              navigation.navigate('LogIn');
            }}
            isModalVisible={showConfirmChangeModal}
            setIsModalVisible={setShowConfirmChangeModal}
            message="Your password has been reset successfully."
          />
        )}
        {showNoPhoneModal && (
          <AlertModal
            title="Oh Snaps!"
            isModalVisible={showNoPhoneModal}
            setIsModalVisible={setShowNoPhoneModal}
            message="Please enter the complete phone number."
          />
        )}

        {isFocused && showErrorModal && (
          <AlertModal
            title="Oh Snaps!"
            isModalVisible={showErrorModal}
            setIsModalVisible={setShowErrorModal}
            message={UserReducer?.errorModal?.msg}
            onPress={() => {
              if (step === 2 && showVerificationFailedModal) {
                setShowVerificationFailedModal(true);
              }
              setOtpCode('');
              setErrorModal();
            }}
          />
        )}

        {showPasswordMismatchModal && (
          <AlertModal
            title="Oh Snaps!"
            isModalVisible={showPasswordMismatchModal}
            setIsModalVisible={setShowPasswordMismatchModal}
            message={'Password Mismatch!'}
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
      </ImageBackground>
    </SafeAreaView>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(ForgetPassword);

const styles = StyleSheet.create({
  lottieStylesButton: {
    height: height * 0.15,
    position: 'absolute',
    left: 0,
    right: 0,
    // top: height * -0.02,
  },
  verifyingView: {
    alignItems: 'center',
    position: 'relative',
    height: height * 0.3,
    justifyContent: 'center',
  },
  verifyingOtpCode: {
    color: 'white',
    fontSize: width * 0.085,
    // position: 'absolute',
    marginBottom: height * 0.2,
  },
  loadingComponent: {
    borderRadius: 50,
    position: 'relative',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.08,
    width: width * 0.8,
    marginVertical: height * 0.02,
  },
  lottieStyles: {
    height: height * 0.35,
    position: 'absolute',
  },
  // OTP Styles
  underlineStyleBase: {
    width: width * 0.15,
    height: height * 0.08,
    fontSize: width * 0.07,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: width * 0.02,
    color: colors?.themePurple1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  heading: {
    color: 'white',
    fontSize: width * 0.11,
  },
  image: {
    justifyContent: 'center',
    height: height,

    alignItems: 'center',
  },
  inputBoxes: {
    marginHorizontal: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
