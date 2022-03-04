import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Button from '../components/Button';
import Inputbox from '../components/Inputbox';
import logo from '../assets/Logo.png';
import background_img from '../assets/background_img.png';
import {connect} from 'react-redux';
import * as actions from '../store/actions/actions';
import Heading from '../components/Heading';
import colors from '../assets/colors';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppStatusBar from '../components/AppStatusBar';
import {useIsFocused} from '@react-navigation/native';
import AlertModal from '../components/AlertModal';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LogIn = ({navigation, user_login, UserReducer, setErrorModal, getCurrentLocationSAVE}) => {
  const isFocused = useIsFocused();
  // console.log(isFocused)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showLoginFailedModal, setShowLoginFailedModal] = useState(
    UserReducer?.loginFailed?.status,
  );
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');




  useEffect(() => {


    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');
        console.log(position, "LOGIN")
        getCurrentLocationSAVE(position)
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        getCurrentLocationSAVE(position) 
        setLocationStatus('You are Here');
        console.log(position, "LOGIN WATCH");

      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

  const _onPressSignUp = () => {
    navigation.navigate('SignUp');
  };

  const _onPressShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const _onPressLogin = async () => {
    if (email.length > 0 && password.length > 0) {
      setIsLoading(true);

      // setTimeout(() => {
      await user_login({email, password}, _onLoginFailed);
      // setIsLoading(false);
      // }, 2000);
    } else {
      setShowAlertModal(true);
    }
  };

  const _onLoginFailed = () => {
    setIsLoading(false);
  };
  const currentBooking = UserReducer?.currentBooking;
  useEffect(() => {
    if (UserReducer?.errorModal?.status) {
      setShowLoginFailedModal(true);
    }
    if (UserReducer?.errorModal?.status == false) {
      setShowLoginFailedModal(false);
    }
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, [UserReducer?.errorModal]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EF2692'}}>
      {/* {Platform.OS == 'ios' && ( */}
      {/* <AppStatusBar
          platform={Platform.OS}
          backgroundColors={colors.themePurple1}
          barStyle="light-content"
        /> */}
      {/* )} */}
      <ImageBackground source={background_img} style={styles.image}>
        <ScrollView showsVerticalScrollIndicator={false}
          

        >
          <View style={styles.centerView}>
            <Image resizeMode="contain" source={logo} style={styles.logo} />

            <Inputbox
              value={email}
              setTextValue={setEmail}
              placeholderTilte="Email"
              isShowIcon={true}
              names={'person'}
            />

            <Inputbox
              value={password}
              setTextValue={setPassword}
              placeholderTilte="Password"
              isSecure={!isShowPassword}
              isPassword={true}
              isShowIcon={true}
              iconStyle={{
                color: 'white',
                paddingLeft: width * 0.006,
              }}
              iconWrapperStyle={{
                position: 'absolute',
                right: width * 0.04,
                left: width * 0.7,
              }}
              names={'lock'}
              onPressIcon={_onPressShowPassword}
            />

            {isLoading ? (
              <TouchableOpacity
                style={styles.loadingComponent}
                activeOpacity={1}>
                <LottieView
                  speed={1}
                  style={styles.lottieStyles}
                  autoPlay
                  colorFilters={'blue'}
                  loop
                  source={require('../assets/Lottie/purple-loading-2.json')}
                />
              </TouchableOpacity>
            ) : (
              <Button
                title="Login"
                btnStyle={styles.loginBtnStyle}
                btnTextStyle={styles.loginBtnTextStyle}
                isBgColor={false}
                onBtnPress={_onPressLogin}
              />
            )}
            <View style={styles.forgotPassView}>
              <Heading
                passedStyle={styles.forgotPassTExt}
                fontType="semi-bold"
                title="Forgot Password?"
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgetPassword')}>
                <Heading
                  passedStyle={styles.clickHere}
                  fontType="semi-bold"
                  title="Click Here"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.horizontalLinePosition}>
              <View style={styles.horizontalLine} />
              <View>
                <Heading
                  fontType="semi-bold"
                  passedStyle={styles.orView}
                  title="OR"
                />
              </View>
              <View style={styles.horizontalLine} />
            </View>
            <Button
              title="Sign Up Now"
              onBtnPress={() => _onPressSignUp()}
              btnStyle={{
                borderRadius: width * 0.08,
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: 'transparent',
                paddingVertical: height * 0.013,
              }}
              btnTextStyle={{
                color: 'white',
                fontFamily: 'Poppins-SemiBold',
              }}
              isBgColor={false}
              isBgColor={false}
            />
          </View>
        </ScrollView>
      </ImageBackground>

      {showAlertModal && (
        <AlertModal
          title="Oh Snaps!"
          message="Look out, one or more requried fields are left empty."
          isModalVisible={showAlertModal}
          setIsModalVisible={setShowAlertModal}
        />
      )}
      {isFocused && showLoginFailedModal && (
        <AlertModal
          title="Login Failed!"
          // message={'login se araha'}
          message={UserReducer?.errorModal?.msg}
          isModalVisible={showLoginFailedModal}
          setIsModalVisible={setShowLoginFailedModal}
          onPress={() => {
            setShowLoginFailedModal(false);
            setErrorModal();
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    height: height * 0.15,
    // height: 100,
    width: 100,
    // position: 'absolute',
    // left: 0,
    // backgroundColor:'red'
    // right: 0,
    // top: height * -0.02,
  },
  container: {
    flex: 1,
  },
  centerView: {
    alignItems: 'center',
    paddingBottom:100,
  },
  forgotPassView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnTextStyle: {
    color: colors.themePurple1,
    fontFamily: 'Poppins-SemiBold',
  },
  loginBtnStyle: {
    borderRadius: width * 0.08,
    backgroundColor: 'white',
    paddingVertical: height * 0.015,
  },
  clickHere: {
    paddingLeft: width * 0.01,
    color: 'white',
    fontSize: width * 0.035,
    textDecorationLine: 'underline',
  },
  forgotPassTExt: {
    color: 'white',
    fontSize: width * 0.04,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.5,
    marginVertical: height * 0.02,
  },
  orView: {
    width: 30,
    textAlign: 'center',
    color: 'white',
    fontSize: width * 0.04,
  },
  // inputView: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: '#E3E3E3',
  //   borderRadius: 15,
  //   width: width * 0.8,
  //   height: height * 0.08,
  // },
  logo: {
    width: width * 0.6,
    height: height * 0.4,
    // marginTop: height * 0.1,
  },

  image: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputBoxes: {
    backgroundColor: 'yellow',
    justifyContent: 'space-around',
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(LogIn);
