import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import PROFILE_IMAGE from '../assets/Images/Logo.png';
import Heading from './Heading';
import LinearGradient from 'react-native-linear-gradient';
import IconComp from './IconComp';
import colors from '../assets/colors';
import LottieView from 'lottie-react-native';
import * as actions from '../store/actions/actions';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

const ConfirmTranslatorModal = ({
  UserReducer,
  navigation,
  route,
  getCurrentBooking,
}) => {
  const data = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = UserReducer?.accessToken;

  const _onPressGoBackHome = async () => {
    setIsLoading(true);
    await getCurrentBooking(accessToken, _onFailedFetching).then(() => {
      navigation.navigate('Home');
    });
  };

  const _onFailedFetching = () => {
    setIsLoading(false);
  };
  return (
    <View style={styles.mainContainerScreen}>
      <StatusBar translucent />
      <View style={styles.outterContainer}>
        <View style={styles.container}>
          <LinearGradient
            colors={['rgba(129,36,108,1)', 'white']}
            style={styles.linearGradient}>
            <Heading title="Pending Approval" passedStyle={styles.heading} />

            {/* Details  */}
            <View style={styles.detailsContainer}>
              {/* Interpreter View  */}
              <View style={styles.interpreterView}>
                <Image
                  resizeMode="contain"
                  source={PROFILE_IMAGE}
                  style={styles.imageStyle}
                />
                <View style={styles.rowView}>
                  <Heading
                    title={data?.name || 'Request Initiated'}
                    passedStyle={styles.usernameStyle}
                  />
                  {/* <Heading
                    title={data?.type || 'Interpreter'}
                    passedStyle={styles.userTypeStyle}
                  /> */}
                </View>
              </View>

              {/* Language  */}
              <View
                style={[
                  styles.btnContainer,
                  data?.translating_language?.length === 1 && {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                ]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconComp
                    type="FontAwesome"
                    name="language"
                    iconStyle={styles.buttonIconStyle}
                  />

                  <Heading title="Languages" passedStyle={styles.buttonLabel} />
                </View>

                {data?.translating_language?.length === 1 ? (
                  <Heading
                    key={data?.translating_language[0]}
                    title={data?.translating_language[0]}
                    fontType={'semi-bold'}
                    passedStyle={styles.buttonLabel2}
                  />
                ) : (
                  <View
                    style={{
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: width * 0.05,
                      // backgroundColor: 'green',
                    }}>
                    {/* {['English', 'Arabic', 'Rohingya', 'Burmese'].map((ele,idx) => ( */}
                    {data?.translating_language?.map((ele, idx) => (
                      <Heading
                        key={idx}
                        title={`${idx + 1}) ${ele}`}
                        fontType={'semi-bold'}
                        passedStyle={styles.buttonLabel2}
                      />
                    ))}
                  </View>
                )}
              </View>

              {/* Call Now */}
              {/* <TouchableOpacity style={styles.btnContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconComp
                    type="FontAwesome"
                    name="phone"
                    iconStyle={styles.buttonIconStyle}
                  />

                  <Heading title="Call Now" passedStyle={styles.buttonLabel} />
                </View>
                <Heading
                  title={data?.phone || '+102332387654'}
                  passedStyle={styles.buttonLabel2}
                />
              </TouchableOpacity> */}

              {/* Check Mark View  */}
              <View
                style={{
                  marginTop: height * -0.01,
                  paddingBottom: height * 0.02,
                }}>
                <IconComp
                  type="MaterialCommunityIcons"
                  name="check-bold"
                  iconStyle={styles.checkIconStyle}
                />
                <IconComp
                  type="FontAwesome"
                  name="language"
                  iconStyle={styles.languageIconStyle}
                />
              </View>

              <Heading title="All right!" passedStyle={styles.allRightText} />
              <Heading
                title="Your request for translator(s) has been initiated you will be notified as admin approves."
                passedStyle={styles.translatorText}
              />
            </View>

            {/* Go Back Home  */}

            {isLoading ? (
              <View style={styles.loadingComponent}>
                <Heading
                  title="Please Wait"
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
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => _onPressGoBackHome()}
                style={styles.goBackButton}>
                <IconComp
                  type="FontAwesome"
                  name="arrow-left"
                  iconStyle={styles.goBackIconStyle}
                />
                <Heading title="Back To home" passedStyle={styles.goBackHome} />
              </TouchableOpacity>
            )}
          </LinearGradient>
        </View>
      </View>
      {/* </LinearGradient> */}
    </View>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(ConfirmTranslatorModal);

const styles = StyleSheet.create({
  mainContainerScreen: {
    backgroundColor: 'white',
  },
  outterContainer: {
    margin: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  allRightText: {
    color: 'black',
    fontSize: width * 0.07,
    fontWeight: '700',
    alignSelf: 'center',
  },
  goBackHome: {
    color: 'white',
    fontSize: width * 0.035,
    fontWeight: '600',
  },
  goBackButton: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: height * 0.03,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: width * 0.06,
    width: width * 0.36,
    paddingVertical: height * 0.015,
    backgroundColor: colors.themePurple1,
  },
  goBackIconStyle: {
    color: 'white',
    fontSize: width * 0.036,
    marginRight: width * 0.02,
  },
  translatorText: {
    color: 'grey',
    fontSize: width * 0.04,
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.05,
    alignSelf: 'center',
  },
  linearGradient: {
    // flex: 1,
    overflow: 'hidden',
    paddingLeft: 15,
    paddingRight: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 0,
    padding: 20,
  },
  container: {
    width: width * 0.9,
    // bottom: 0,
    // left: 0,
    justifyContent: 'space-around',
    alignSelf: 'center',
    // right: 0,
    marginTop: height * 0.1,
    // position: 'absolute',
    // height: height * 0.8,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  btnContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    paddingVertical: height * 0.03,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
    paddingHorizontal: width * 0.06,
    backgroundColor: 'white',
  },
  heading: {
    marginVertical: height * 0.03,
    fontSize: width * 0.07,
    fontWeight: '700',
    alignSelf: 'center',
    color: 'white',
  },
  detailsContainer: {
    width: width * 0.8,
    alignSelf: 'center',
    borderRadius: 25,
    backgroundColor: 'white',
    elevation: 8,
    margin: 15,
  },
  interpreterView: {
    flexDirection: 'row',
    height: height * 0.16,
    width: width * 0.8,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
  },
  imageStyle: {
    width: width * 0.15,
    // borderRadius: width * 0.5,
  },
  rowView: {
    marginLeft: width * 0.03,
    justifyContent: 'center',
  },
  usernameStyle: {
    fontSize: width * 0.05,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: 'black',
  },
  userTypeStyle: {
    fontSize: width * 0.04,
    color: 'grey',
    textTransform: 'capitalize',
  },
  buttonIconStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.05,
    alignSelf: 'center',
  },
  buttonLabel: {
    fontSize: width * 0.035,
    marginLeft: width * 0.04,
    color: 'black',
  },
  buttonLabel2: {
    textTransform: 'capitalize',
    fontSize: width * 0.035,
    marginLeft: width * 0.04,
    color: 'black',
    width: width * 0.25,
    marginTop: 2,
    // backgroundColor: 'red',
  },
  checkIconStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.26,
    alignSelf: 'center',
  },
  languageIconStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.05,
    alignSelf: 'center',
    padding: width * 0.025,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: width * 0.07,
    elevation: 9,
    top: height * 0.085,
    right: width * 0.31,
  },
  lottieStyles: {
    height: height * 0.13,
    position: 'absolute',
    left: width * 0.1,
    right: 0,
    // top: height * -0.014,
  },
  loadingComponent: {
    borderRadius: width * 0.02,
    position: 'relative',
    // borderWidth: 1,
    // borderColor: colors.themePurple1,
    // backgroundColor: colors.themePurple1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.08,
    width: width * 0.8,
    marginVertical: height * 0.02,
  },
  savingText: {
    color: colors.themePurple1,
    position: 'absolute',
    left: width * 0.22,
    top: height * 0.022,
    fontSize: width * 0.045,
  },
});
