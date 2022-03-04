import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import colors from '../assets/colors';
import Heading from '../components/Heading';
import background_img from '../assets/background_img.png';
import {useIsFocused} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as actions from '../store/actions/actions';
import IconComp from '../components/IconComp';
import Button from '../components/Button';
import StripeModal from '../components/StripeModal';
import {StripeProvider} from '@stripe/stripe-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppStatusBar from '../components/AppStatusBar';
import {connect} from 'react-redux';
import {PUB_KEY_STRIPE} from '../config/config';
import AlertModal from '../components/AlertModal';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignupPackage = ({
  route,
  UserReducer,
  buyPackage,
  skipBuyingPackage,
  setErrorModal,
}) => {
  const accessToken = UserReducer?.accessToken;
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stripeGeneratedKey, setStripeGeneratedKey] = useState('');
  const isFocused = useIsFocused();
 
  const [showPackageBuyingFailedModal, setShowPackageBuyingFailedModal] =
    useState(false);

  const _onPressBuyNow = async () => {
    if (stripeGeneratedKey === '') {
      alert('Card number is required');
    } else {
      const data = {
        package_id: route.params?.service_type?.id,
        stripeToken: stripeGeneratedKey,
      };
      setIsLoading(true);
      await buyPackage(data, accessToken, () => {}, _onRequestFailed);
    }
  };

  const _onRequestFailed = () => {
    setIsLoading(false);
  };

  const _onPressSkip = async () => {
    setIsLoading(true);
    await skipBuyingPackage();
    // setIsLoading(false);
  };

  useEffect(() => {
    // if (UserReducer?.errorModal?.status === true) {
    //   setShowPackageBuyingFailedModal(true);
    // }
    if (UserReducer?.errorModal?.status === false) {
      setShowPackageBuyingFailedModal(false);
    }
  }, [UserReducer?.errorModal]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EF2692'}}>
      {/* <AppStatusBar
        backgroundColor={colors.themePurple1}
        barStyle="light-content"
      /> */}
      <StripeProvider publishableKey={PUB_KEY_STRIPE}>
        <View style={styles.container}>
          <ImageBackground source={background_img} style={styles.image}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.contentView}>
                <View style={styles.rowView}>
                  <Heading
                    title="As,"
                    passedStyle={styles.ourLabel}
                    fontType="semi-bold"
                  />
                  <Heading
                    title={route?.params?.service_type?.name}
                    passedStyle={styles.packageLabel}
                    fontType="semi-bold"
                  />
                </View>
                <View style={styles.flatListStyle}>
                  {/* Package Header  */}
                  <Heading
                    title={'Package Details'}
                    passedStyle={styles.packageName}
                    fontType="semi-bold"
                  />

                  {/* Packages Key Points */}
                  {route?.params?.service_type?.description?.map((ele, idx) => {
                    return (
                      <View style={styles.packageKeyPointsView} key={idx}>
                        <IconComp
                          name="checkcircle"
                          type="AntDesign"
                          iconStyle={styles.iconStyle}
                        />
                        <Heading
                          title={ele}
                          passedStyle={styles.featureStyle}
                          fontType="regular"
                        />
                      </View>
                    );
                  })}

                  {/* Skip Button  */}
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
                    <>
                      <Button
                        onBtnPress={() => {
                          setIsModalVisible(true);
                        }}
                        title="Buy Now"
                        isBgColor={false}
                        btnStyle={styles.btnStyle}
                        btnTextStyle={styles.btnTextStyle}
                      />
                      <Button
                        onBtnPress={_onPressSkip}
                        title="Skip"
                        isBgColor={false}
                        btnStyle={styles.skipbtnStyle}
                        btnTextStyle={styles.btnTextStyle}
                      />
                    </>
                  )}
                </View>
              </View>
              {isModalVisible && (
                <StripeModal
                  isLoading={isLoading}
                  setId={setStripeGeneratedKey}
                  onPress={_onPressBuyNow}
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                />
              )}
              {isFocused && showPackageBuyingFailedModal && (
                <AlertModal
                  title="Oh Snaps!"
                  message={UserReducer?.errorModal?.status}
                  isModalVisible={showPackageBuyingFailedModal}
                  onPress={() => {
                    setShowPackageBuyingFailedModal(false);
                    setErrorModal();
                  }}
                  setIsModalVisible={setShowPackageBuyingFailedModal}
                />
              )}
            </ScrollView>
          </ImageBackground>
        </View>
      </StripeProvider>
    </SafeAreaView>
  );
};
const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(SignupPackage);

const styles = StyleSheet.create({
  loadingComponent: {
    borderRadius: 50,
    position: 'relative',
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.08,
    width: width * 0.8,
    marginVertical: height * 0.02,
  },
  lottieStyles: {
    height: height * 0.3,
    position: 'absolute',
    left: 0,
    right: 0,
    // top: height * -0.02,
  },
  contentView: {
    marginHorizontal: width * 0.1,
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 100,
  },
  btnStyle: {
    backgroundColor: colors.themeYellow,
    margin: 0,
    marginTop: height * 0.03,
    width: width * 0.8,
    paddingVertical: height * 0.02,
    borderRadius: width * 0.08,
  },
  skipbtnStyle: {
    backgroundColor: 'white',
    margin: 0,
    marginTop: height * 0.03,
    width: width * 0.8,
    paddingVertical: height * 0.02,
    borderRadius: width * 0.08,
  },
  btnTextStyle: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  image: {
    height: height,
  },
  featureStyle: {
    color: 'white',
    fontSize: width * 0.05,
    textTransform: 'capitalize',
    fontWeight: '600',
    paddingLeft: width * 0.025,
  },
  iconStyle: {
    fontSize: width * 0.05,
    marginTop: height * 0.005,
    color: colors.themeYellow,
  },
  packageKeyPointsView: {
    flexDirection: 'row',
    paddingVertical: height * 0.005,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: colors.themeYellow,
    marginBottom: height * 0.02,
  },
  ourLabel: {
    fontSize: width * 0.09,
    color: 'black',
    paddingRight: width * 0.02,
  },
  packageLabel: {
    fontSize: width * 0.09,
    color: colors.themeYellow,
    textTransform: 'capitalize',
  },
  flatListStyle: {
    // alignItems: 'center',
    justifyContent: 'center',
  },
  flatListHeaderStyles: {
    justifyContent: 'flex-start',
    width: width * 0.85,
    marginVertical: height * 0.02,
  },
  packageName: {
    color: 'white',
    fontSize: width * 0.09,
    textTransform: 'capitalize',
  },
});

const dummyPackage = {
  _id: 1,
  package: {
    name: 'package 1',
    features: [
      {
        _id: 1,
        name: 'lorem ipsum is a dummy text is a dummy text is a dummy text',
      },
      {
        _id: 2,
        name: 'lorem ipsum is a dummy text is a dummy text is a dummy text',
      },
      {
        _id: 3,
        name: 'lorem ipsum is a dummy text is a dummy text is a dummy text',
      },
      {
        _id: 4,
        name: 'lorem ipsum is a dummy text is a dummy text is a dummy text',
      },
      {
        _id: 5,
        name: 'lorem ipsum is a dummy text is a dummy text is a dummy text',
      },
    ],
  },
};
