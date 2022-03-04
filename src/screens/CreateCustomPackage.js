import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../assets/colors';
import AppStatusBar from '../components/AppStatusBar';
import Button from '../components/Button';
import Header from '../components/Header';
import Heading from '../components/Heading';
import LottieView from 'lottie-react-native';
import * as actions from '../store/actions/actions';
import Inputbox from '../components/Inputbox';
import {connect} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import {PUB_KEY_STRIPE} from '../config/config';
import StripeModal from '../components/StripeModal';
import AlertModal from '../components/AlertModal';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CreateCustomPackage = ({
  navigation,
  createCustomPackage,
  UserReducer,
  cancelSubscription,
}) => {
  const price = (UserReducer?.packages[0]?.price).toFixed(2);
  const accessToken = UserReducer?.accessToken;
  const [noOfInterpreters, setNoOfInterpreters] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const CURRENT_PACKAGE_ID = UserReducer?.userData?.current_package?.id;
  const [isStripeModalVisible, setIsStripeModalVisible] = useState(false);
  const [stripeGeneratedKey, setStripeGeneratedKey] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isConfirmBuyModalVisible, setIsConfirmBuyModalVisible] =
    useState(false);

  const _onPressCreateAndSubscribe = async () => {
    if (
      noOfInterpreters !== '' &&
      noOfInterpreters !== 0 &&
      noOfInterpreters !== undefined
    ) {
      setIsStripeModalVisible(true);
    } else {
      return;
    }
  };

  const _onSuccess = () => {
    setIsStripeModalVisible(false);
    setIsConfirmBuyModalVisible(true);
  };

  const _onPressBuy = async () => {
    setIsLoading(true);
    if (stripeGeneratedKey === '') {
      alert('Card number is required');
    } else {
      const data = {
        price: Number(noOfInterpreters) * price,
        package_limit: noOfInterpreters,
        stripeToken: stripeGeneratedKey,
      };
      if (UserReducer?.userData?.current_package === null) {
        await createCustomPackage(data, accessToken, _onSuccess);
      } else {
        await cancelSubscription(CURRENT_PACKAGE_ID, accessToken, () => {});
        await createCustomPackage(data, accessToken, _onSuccess);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (UserReducer?.errorModal?.status) {
      setShowErrorModal(true);
    }
  }, [UserReducer]);

  const dummyTranslator = {
    _id: 1,
    name: 'michael reimer',
    type: 'translator',
    native: 'english',
    phone: '0800 1234 567',
  };

  return (
    <StripeProvider publishableKey={PUB_KEY_STRIPE}>
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          {/* <AppStatusBar
            backgroundColor={colors.themePurple1}
            barStyle="light-content"
          /> */}
          <Header title="back" showBackBtn={true} navigation={navigation} />
          {/* Page Heading */}
          <Heading
            title="Create & Subscribe Package"
            passedStyle={styles.heading}
            fontType="semi-bold"
          />
          <View style={{alignItems: 'center'}}>
            {/* Phone   */}
            <Inputbox
              value={noOfInterpreters}
              setTextValue={setNoOfInterpreters}
              placeholderTilte="No. of Interpreters"
              keyboardType="numeric"
              placeholderTextColor={'grey'}
              // isShowIcon={true}
              // isPassword={true}
              // onPressIcon={() => {}}
              passedStyle={styles.inputStyle}
              // iconStyle={styles.iconStyle}
              // iconWrapperStyle={styles.iconWrapperStyle}
              // iconType={'MaterialCommunityIcons'}
              // names={'counter'}
            />

            <View style={styles.approxBox}>
              <Heading
                title={`$${(Number(noOfInterpreters) * price).toFixed(2)}`}
                passedStyle={styles.approxLabel}
                fontType="bold"
              />
              <Heading
                title={`$${price} per interpreter`}
                passedStyle={styles.totalHours}
              />
            </View>

            {isLoading ? (
              <View style={styles.loadingComponent} activeOpacity={1}>
                <Heading
                  title="Please Wait"
                  fontType={'semi-bold'}
                  passedStyle={styles.pleaseWaitText}
                />
                <LottieView
                  speed={1}
                  style={styles.lottieStyles}
                  autoPlay
                  colorFilters={'blue'}
                  loop
                  source={require('../assets/Lottie/purple-loading-2.json')}
                />
              </View>
            ) : (
              <Button
                title="Create & Subscribe Now"
                onBtnPress={() => _onPressCreateAndSubscribe()}
                btnStyle={styles.btnStyle}
                btnTextStyle={styles.btnTextStyle}
                isBgColor={false}
              />
            )}
          </View>
        </SafeAreaView>
      </View>
      {isStripeModalVisible && (
        <StripeModal
          setId={setStripeGeneratedKey}
          onPress={_onPressBuy}
          isLoading={isLoading}
          isModalVisible={isStripeModalVisible}
          setIsModalVisible={setIsStripeModalVisible}
        />
      )}

      {isConfirmBuyModalVisible && (
        <AlertModal
          title="Success!"
          message={`You have successfully created & subscribed to a custom package.`}
          isModalVisible={isConfirmBuyModalVisible}
          setIsModalVisible={setIsConfirmBuyModalVisible}
          onPress={() => {
            navigation.navigate('Home');
            setIsConfirmBuyModalVisible(true);
          }}
        />
      )}
      {showErrorModal && (
        <AlertModal
          title="Submission Error :("
          message={`Something went wrong.`}
          isModalVisible={showErrorModal}
          setIsModalVisible={setShowErrorModal}
        />
      )}
    </StripeProvider>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(CreateCustomPackage);

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
    borderRadius: 50,
    backgroundColor: colors.themePurple1,
  },
  btnTextColor: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.045,
  },
  btnTextStyle: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  loadingComponent: {
    borderRadius: 50,
    position: 'relative',
    backgroundColor: colors.themePurple1,
    justifyContent: 'center',
    height: height * 0.08,
    width: width * 0.8,
    marginVertical: height * 0.02,
  },
  pleaseWaitText: {
    fontSize: width * 0.05,
    color: 'black',
    marginLeft: width * 0.19,
    color: 'white',
  },
  lottieStyles: {
    height: height * 0.13,
    position: 'absolute',
    left: width * 0.1,
    right: 0,
    // top: height * -0.017,
  },
  inputStyle: {
    width: width * 0.9,
    alignItems: 'center',
    color: 'black',
    fontSize: width * 0.05,
    borderWidth: 1,
    borderColor: colors.themePurple1,
  },
  iconStyle: {
    color: 'grey',
    paddingLeft: width * 0.04,
    fontSize: width * 0.07,
  },
  iconWrapperStyle: {
    top: height * 0.04,
  },
  approxBox: {
    marginVertical: height * 0.025,
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: width * 0.8,
    borderRadius: width * 0.09,
    borderWidth: 1.2,
    borderColor: colors.themePurple1,
    position: 'relative',
  },
  approxLabel: {
    fontSize: width * 0.07,
    color: colors.themePurple1,
  },
  totalHours: {
    fontWeight: '400',
    fontSize: width * 0.043,
    color: 'black',
  },
});
