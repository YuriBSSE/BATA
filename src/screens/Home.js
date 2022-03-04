import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  PermissionsAndroid,
  Platform,
  RefreshControl
} from 'react-native';
// import {MotiView} from 'moti';
import {connect} from 'react-redux';
import colors from '../assets/colors';
import Header from '../components/Header';
import Heading from '../components/Heading';
// import MapView, {Marker} from 'react-native-maps';
import * as actions from '../store/actions/actions';
import AppStatusBar from '../components/AppStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapViewDirections from 'react-native-maps-directions';
import RatingsAndReviewsModal from '../components/RatingsAndReviewsModal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
// import Geolocation from '@react-native-community/geolocation';
// import Geolocation from 'react-native-geolocation-service';
import CurrentInterpreter from '../components/CurrentInterpreter';
import AlertModal from '../components/AlertModal';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useIsFocused} from '@react-navigation/native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Geolocation from '@react-native-community/geolocation';
import messaging from '@react-native-firebase/messaging';
// const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0925;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const API_MAP_KEY = 'AIzaSyBTsC4XcbDQgH_tBwHdKAUUXyVtdOTL4l0';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const Home = ({
  navigation,
  UserReducer,
  setErrorModal,
  completeEvent,
  getCurrentBooking,
  submitReviewsAndRatings,
  getCurrentLocationSAVE
}) => {
  var watchID = useRef(null);
  const isFocused = useIsFocused();
  const [mapRef, setMapRef] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingId, setBookingId] = useState(false);
  const accessToken = UserReducer?.accessToken;

  const currentBooking = UserReducer?.currentBooking;
  const [hasAlreadyBooked, setHasAlreadyBooked] = useState(false);
  const [showRatingsReviewsModal, setShowRatingsReviewsModal] = useState(false);
  const [showMustBuyPackageModal, setShowMustBuyPackageModal] = useState(false);
  const [showFailedCompletingModal, setShowFailedCompletingModal] =
    useState(false);
  console.log(currentBooking, "DASDASDASDASD");

  //
  const username = UserReducer?.userData?.first_name;
  // const [coordinates, setCoordinates] = useState({
  //   latitude: UserReducer?.coords?.lat,
  //   longitude: UserReducer?.coords?.lng,
  // });\


  const [coordinates, setCoordinates] = useState({
      latitude: null,
      longitude: null,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA
  });

  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getOneTimeLocation();
      subscribeLocationLocation();
      
      if (accessToken !== undefined && accessToken !== null && isFocused) {
        getCurrentBooking(accessToken, () => {});
      }
      setRefreshing(false)
    });
  }, []);

  async function registerAppWithFCM() {
    const c =  await messaging().registerDeviceForRemoteMessages();
    console.log(c, "SADASDASDASDASDASD")
    if(c){
      messaging()
      .getToken()
      .then(token => {
        console.log('TOKEN: : : : :  :', token);
        // setFCMToken(token);
      });
    }
   }

  useEffect(()=>{
    registerAppWithFCM()
    setRefreshing(false)
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          longitudeDelta: LONGITUDE_DELTA,
          latitudeDelta: LATITUDE_DELTA
        })
        getCurrentLocationSAVE(position) 
        // setCoordinatesLat(position.coords.latitude)
        // setCoordinatesLong(position.coords.longitude)
        setIsLoading(false)
      },
      error => {
        console.log(error.message);
        setIsLoading(false)
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  },[])

  useEffect(() => {
    setRefreshing(false)
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

    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
     
        // console.log(position, 'getOneTimeLocation');

        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          longitudeDelta: LONGITUDE_DELTA,
          latitudeDelta: LATITUDE_DELTA
        })
        getCurrentLocationSAVE(position) 

      },
      error => {
        setLocationStatus(error.message);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          longitudeDelta: LONGITUDE_DELTA,
          latitudeDelta: LATITUDE_DELTA
        })
        setIsLoading(false);
        // if(mapRef){
        //   mapRef.animateToRegion(region,1000)
        // }
        setLocationStatus('You are Here');

      },
      error => {
        setLocationStatus(error.message);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };




  const _onSucessSubmitReview = () => {
    setShowRatingsReviewsModal(false);
  };

  const _onPressSubmitReview = async (review, ratings) => {
    const data = {
      // interpreter: 1,
      comment: review,
      booking: bookingId,
      rate: ratings,
    };

    await submitReviewsAndRatings(data, accessToken, _onSucessSubmitReview);
    setIsLoading(false);
  };

  const _onPressComplete = async () => {

    await completeEvent(
      UserReducer?.currentBooking?.id,
      accessToken,
      _onSuccessCompleteEvent,
    );
    setIsLoading(false);
  };

  const _onSuccessCompleteEvent = id => {
    setShowRatingsReviewsModal(true);
    setBookingId(id);
  };

  useEffect(() => {
    if (UserReducer?.errorModal?.status) {
      setShowFailedCompletingModal(true);
    }
    if (UserReducer?.errorModal?.status === false) {
      setShowFailedCompletingModal(false);
    }
  }, [UserReducer.errorModal]);

  useEffect(() => {
    if (accessToken !== undefined && accessToken !== null && isFocused) {
      getCurrentBooking(accessToken, () => {});
    }
  }, [isFocused]);

  useEffect(() => {
    setErrorModal();
  }, []);
  if(isLoading){
    return <View style={{flex: 1, alignSelf:'center'}} >
          <LottieView
                  speed={1}
                  style={{
                    width: '40%', height: '100%', justifyContent:'center', alignItems:'center',
                  }}
                  autoPlay
                  loop
                  source={require('../assets/Lottie/purple-loading-2.json')}
                />
         </View>
  }{
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <Header title="Menu" navigation={navigation} />

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <View style={styles.greetingContainer}>
            <View style={styles.animationView}>

              <Heading
                title="Welcome,"
                passedStyle={styles.heading}
                fontType="light"
              />
              <Heading
                title={username}
                passedStyle={[
                  styles.heading_username,
                  username?.length > 7 && {fontSize: width * 0.08},
                ]}
                fontType="bold"
              />
            </View>
            <Image
              source={require('../assets/Images/handeshake.png')}
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.optionsWrapper}>
            {/* Translators  */}
            <TouchableOpacity
              style={styles.optionContainer}
              activeOpacity={0.7}
              onPress={() => {
                if (
                  UserReducer?.userData?.current_package === null ||
                  UserReducer?.userData?.current_package === undefined
                ) {
                  setShowMustBuyPackageModal(true);
                } else if (
                  UserReducer?.currentBooking !== null &&
                  UserReducer?.currentBooking !== undefined
                ) {
                  setHasAlreadyBooked(true);
                } else {
                  navigation.navigate('Translator');
                }
              }}>
              <View style={styles.optionImageContainer}>
                <Image
                  source={require('../assets/Images/translate.png')}
                  style={styles.optionImageStyle}
                />
              </View>
              <Heading
                passedStyle={styles.textStyle}
                title={'Interpreters'}
                fontType="regular"
              />
            </TouchableOpacity>

            {/* Packages  */}
            <TouchableOpacity
              style={styles.optionContainer}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Packages')}>
              <View style={styles.optionImageContainer}>
                <Image
                  source={require('../assets/Images/package.png')}
                  style={styles.optionImageStyle}
                />
              </View>
              <Heading
                passedStyle={styles.textStyle}
                title={'Packages'}
                fontType="regular"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.map}>
            {console.log(coordinates.latitude, coordinates.longitude)}
            {console.log(UserReducer?.coords?.lat)}
            {
              coordinates.latitude && coordinates.longitude || UserReducer?.coords?.lat ?
            <MapView
              style={{width: width * 0.8, height: height * 0.36}}
              ref={ref => setMapRef(ref)}
              mapType={Platform.OS == 'android' ? 'terrain' : 'standard'}
              provider={Platform.OS == 'android' ? PROVIDER_GOOGLE : null}
              showsMyLocationButton={true}
              zoomEnabled={true}
              scrollEnabled={true}
              initialRegion={{
                latitude: coordinates.latitude || UserReducer?.coords?.lat,
                longitude: coordinates.longitude || UserReducer?.coords?.lng,
                latitudeDelta: 0.0622,
                longitudeDelta: 0.0121,
              }}

              followsUserLocation
            >
              <Marker
                coordinate={{
                  latitude: coordinates.latitude || UserReducer?.coords?.lat,
                  longitude: coordinates.longitude || UserReducer?.coords?.lng,
                }}
              />
            </MapView>: 
            <View style={{flex: 1, alignSelf:'center'}} >
                <LottieView
                        speed={1}
                        style={{
                          width: '40%', height: '100%', justifyContent:'center', alignItems:'center',
                        }}
                        autoPlay
                        loop
                        source={require('../assets/Lottie/purple-loading-2.json')}
                      />
            </View>
          }
          </View>
          {currentBooking !== null &&
            currentBooking !== undefined &&
            currentBooking?.status !== 'completed' && (
              <>
                <Heading
                  title="Booking Detail"
                  fontType={'bold'}
                  passedStyle={{
                    color: 'black',
                    fontSize: width * 0.06,
                    marginLeft: width * 0.05,
                  }}
                />
                <CurrentInterpreter
                  item={currentBooking}
                  isLoading={isLoading}
                  onPress={_onPressComplete}
                  // key={currentBooking.id}
                />
              </>
            )}
          {showRatingsReviewsModal && (
            <RatingsAndReviewsModal
              isModalVisible={showRatingsReviewsModal}
              onPress={_onPressSubmitReview}
              isLoading={isLoading}
              setIsModalVisible={setShowRatingsReviewsModal}
            />
          )}
          {hasAlreadyBooked && (
            <AlertModal
              title="Not allowed!"
              message={'You have already booked an interpreter.'}
              isModalVisible={hasAlreadyBooked}
              setIsModalVisible={setHasAlreadyBooked}
            />
          )}
          {showMustBuyPackageModal && (
            <AlertModal
              title="Not allowed!"
              message={'You need to buy a package first.'}
              isModalVisible={showMustBuyPackageModal}
              setIsModalVisible={setShowMustBuyPackageModal}
            />
          )}
          {isFocused && showFailedCompletingModal && (
            <AlertModal
              title="Oh Snaps :("
              // message={"idher se araha ha"}
              message={UserReducer?.errorModal?.msg}
              buttonText={"Try in a while"}
              isModalVisible={showFailedCompletingModal}
              setIsModalVisible={setShowFailedCompletingModal}
              onPress={() => {
                setErrorModal();
                setShowFailedCompletingModal(false);
              }}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
  }
};

const styles = StyleSheet.create({
  animationView: {
    flexDirection: 'column',
    marginLeft: width * 0.05,
  },
  optionsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.025,
    width: width * 0.9,
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
  textStyle: {
    fontSize: width * 0.04,
    color: 'black',
    textTransform: 'capitalize',
  },
  myRatings: {
    fontSize: width * 0.04,
    color: 'white',
    marginTop: height * 0.01,
  },
  optionImageContainer: {
    paddingVertical: height * 0.032,
    paddingHorizontal: width * 0.12,
    marginBottom: height * 0.018,
    backgroundColor: colors?.themePurple1,
    borderRadius: width * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingsContainer: {
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.1,
    marginBottom: height * 0.018,
    backgroundColor: colors?.themePurple1,
    borderRadius: width * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionImageStyle: {
    width: width * 0.1,
    height: height * 0.05,
  },
  reviewImageStyle: {
    width: width * 0.1,
    height: height * 0.05,
  },
  optionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.02,
    width: width * 0.4,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    marginVertical: height * 0.04,
    width: width * 0.8,
    height: height * 0.36,
    alignSelf: 'center',
    borderRadius: width * 0.05,
    overflow: 'hidden',
  },
  img_wave: {
    marginTop: height * 0.15,
    marginLeft: width * 0.12,
  },
  heading: {
    color: 'black',
    fontSize: width * 0.11,
  },
  heading_username: {
    color: colors.themePurple1,
    fontSize: width * 0.11,
    textTransform: 'capitalize',
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    textTransform: 'capitalize',
    marginTop: height * 0.02,
    marginHorizontal: width * 0.05,
  },
  imageStyle: {
    width: width * 0.16,
    marginLeft: width * 0.05,
    height: height * 0.08,
  },
  flatListStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.045,
  },
  paymentOptionsContainer: {
    borderWidth: 1.2,
    paddingVertical: height * 0.02,
    width: width * 0.8,
    marginHorizontal: width * 0.1,
    borderRadius: width * 0.04,
    borderColor: colors.themePurple1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardTextView: {
    flexDirection: 'column',
    marginRight: width * 0.1,
  },
  cardPaymenLabelText: {
    color: 'black',
    fontSize: width * 0.045,
  },
  cardImage: {
    width: width * 0.2,
    height: height * 0.07,
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(Home);
