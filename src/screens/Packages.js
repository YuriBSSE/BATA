import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import colors from '../assets/colors';
import Header from '../components/Header';
import Heading from '../components/Heading';
import PackagesMapper from '../components/PackagesMapper';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppStatusBar from '../components/AppStatusBar';
import * as actions from '../store/actions/actions';
import {connect} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import {PUB_KEY_STRIPE} from '../config/config';
import StripeModal from '../components/StripeModal';
import AlertModal from '../components/AlertModal';
import IconComp from '../components/IconComp';
import {useIsFocused} from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Packages = ({
  navigation,
  UserReducer,
  getAllPackages,
  buyPackage,
  setErrorModal,
  updatePackage,
}) => {
  const currentBooking = UserReducer?.currentBooking;
  const isFocused = useIsFocused();
  const accessToken = UserReducer?.accessToken;
  const [stripeGeneratedKey, setStripeGeneratedKey] = useState('');
  const [packages, setPackages] = useState(UserReducer?.packages);
  const [isStripeModalVisible, setIsStripeModalVisible] = useState(false);
  const [showPackageBuyFailedModal, setShowPackageBuyFailedModal] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isConfirmBuyModalVisible, setIsConfirmBuyModalVisible] =
    useState(false);
  // on Packages Get Started Press
  const _onGetStartedPress = async (item, index) => {
    setIsStripeModalVisible(true);
    setSelectedPackage(item);
  };

  // Close Stripe Modal
  const _closeStripeModal = () => {
    setIsStripeModalVisible(false);
    setIsConfirmBuyModalVisible(true);
  };

  // Buy Package
  const _onPressBuy = async () => {
    setIsLoading(true);
    if (stripeGeneratedKey === '') {
      alert('Card number is required');
    } else {
      console.log(stripeGeneratedKey);
      const data = {
        package_id: selectedPackage.id,
        stripeToken: stripeGeneratedKey,
      };
      if (UserReducer?.userData?.current_package === null) {
        await buyPackage(data, accessToken, _closeStripeModal,() => {});
      } else {
        await updatePackage(data, accessToken, _closeStripeModal);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllPackages(accessToken);
  }, []);

  useEffect(() => {
    if (UserReducer?.errorModal?.status === true) {
      setShowPackageBuyFailedModal(true);
    }
    if (UserReducer?.errorModal?.status === false) {
      setShowPackageBuyFailedModal(false);
    }
  }, [UserReducer?.errorModal]);
  return (
    <StripeProvider publishableKey={PUB_KEY_STRIPE}>
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          {/* <AppStatusBar
            backgroundColor={colors.themePurple1}
            barStyle="light-content"
          /> */}
          {/* Header  */}
          <Header title="Packages" navigation={navigation} />

          {/* Packages Rendering  */}
          <FlatList
            data={packages}
            nestedScrollEnabled={true}
            keyExtractor={item => item.id?.toString()}
            contentContainerStyle={styles.flatListStyle}
            renderItem={({item, index}) =>
              (index === 0 || index === 1 || index === 2) && (
                <PackagesMapper
                  key={item?.id}
                  item={item}
                  index={index}
                  current_package={UserReducer?.userData?.current_package}
                  onPress={_onGetStartedPress}
                />
              )
            }
            ListHeaderComponentStyle={styles.flatListHeaderStyles}
            ListHeaderComponent={() => {
              return (
                <View style={styles.rowView}>
                  <Heading
                    title="Our"
                    passedStyle={styles.ourLabel}
                    fontType="light"
                  />
                  <Heading
                    title="Packages"
                    passedStyle={styles.packageLabel}
                    fontType="semi-bold"
                  />
                </View>
              );
            }}
            ListFooterComponentStyle={styles.footerStyles}
            ListFooterComponent={() => (
              <View style={{paddingBottom: height * 0.025}}>
                <Heading
                  title={'Create & Subscribe Custom Package'}
                  passedStyle={styles.packageName}
                  fontType="semi-bold"
                />
                <View style={styles.packageDescCntainer}>
                  <IconComp
                    name="checkcircle"
                    type="AntDesign"
                    iconStyle={styles.iconStyle}
                  />
                  <Heading
                    title={
                      'Video And Audio Interpretation Depending On The Business And People Required.'
                    }
                    passedStyle={styles.featureStyle}
                    fontType="regular"
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.btnStyle}
                  onPress={() => navigation.navigate('CustomPackage')}>
                  <Heading
                    title="Get Started"
                    passedStyle={styles.btnTextStyle}
                    fontType={'semi-bold'}
                  />
                </TouchableOpacity>
                {UserReducer?.userData?.current_package?.name?.toLowerCase() !==
                  'individual' &&
                  UserReducer?.userData?.current_package?.name?.toLowerCase() !==
                    'enterprise' &&
                  UserReducer?.userData?.current_package !== null &&
                  UserReducer?.userData?.current_package !== undefined && (
                    <View
                      style={{
                        width: width * 0.35,
                        paddingVertical: height * 0.005,
                        borderRadius: width * 0.07,
                        alignItems: 'center',
                        alignSelf: 'center',
                        position: 'absolute',
                        justifyContent: 'center',
                        backgroundColor: colors.themeYellow,
                        top: height * -0.05,
                        left: width * 0.35,
                      }}>
                      <Heading
                        title={'Activated'}
                        fontType={'semi-bold'}
                        passedStyle={{fontSize: width * 0.05, color: 'black'}}
                      />
                    </View>
                  )}
              </View>
            )}
          />
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
          message={`${selectedPackage.name} package has been activated now.`}
          isModalVisible={isConfirmBuyModalVisible}
          setIsModalVisible={setIsConfirmBuyModalVisible}
        />
      )}
      {(isFocused && showPackageBuyFailedModal) && (
        <AlertModal
          title="Oh Snaps!"
          message={UserReducer?.errorModal?.msg}
          isModalVisible={showPackageBuyFailedModal}
          onPress={() => {
            setShowPackageBuyFailedModal(false);
            setErrorModal();
          }}
          setIsModalVisible={setShowPackageBuyFailedModal}
        />
      )}
    </StripeProvider>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(Packages);

const styles = StyleSheet.create({
  featureStyle: {
    color: 'white',
    fontSize: width * 0.045,
    textTransform: 'capitalize',
    fontWeight: '600',
    paddingLeft: width * 0.025,
  },
  iconStyle: {
    fontSize: width * 0.05,
    marginTop: height * 0.008,
    color: colors.themeYellow,
  },
  packageDescCntainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    paddingVertical: height * 0.01,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ourLabel: {
    fontSize: width * 0.09,
    color: 'black',
    paddingRight: width * 0.02,
  },
  packageLabel: {
    fontSize: width * 0.09,
    color: colors.themePurple1,
  },
  flatListStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  flatListHeaderStyles: {
    justifyContent: 'flex-start',
    width: width * 0.85,
    marginVertical: height * 0.02,
  },
  footerStyles: {
    width: width * 0.85,
    marginBottom: height * 0.05,
    borderRadius: width * 0.05,
    backgroundColor: colors.themePurple1,
    paddingVertical: height * 0.07,
    paddingHorizontal: width * 0.1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21,
  },
  btnStyle: {
    marginTop: height * 0.03,
    backgroundColor: 'white',
    width: width * 0.65,
    paddingVertical: height * 0.018,
    borderRadius: width * 0.08,
    alignItems: 'center',
  },
  btnTextStyle: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  packageName: {
    color: 'white',
    fontSize: width * 0.065,
    textTransform: 'capitalize',
    marginBottom: height * 0.03,
  },
});
