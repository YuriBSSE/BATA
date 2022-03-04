import React, {useEffect} from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import background_img from '../assets/background_img.png';
import logo from '../assets/Logo.png';
import * as actions from '../store/actions/actions';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppStatusBar from '../components/AppStatusBar';
import {connect} from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Splash = ({navigation, getAllPackages, getAllLanguages,getCurrentLocation}) => {
  const _onPressSignUp = () => {
    navigation.navigate('LogIn');
  };

  useEffect(() => {
    getAllPackages();
    // getCurrentLocation()
    getAllLanguages();
  }, []);

  return (
    <ImageBackground source={background_img} style={styles.image}>
      <Image resizeMode="contain" source={logo} style={styles.logo} />
      <View
        style={{
          position: 'absolute',
          bottom: height * 0.05,
        }}>
        <Button
          title="Get Started >"
          onBtnPress={() => _onPressSignUp()}
          isBgColor={false}
          btnTextStyle={{color: 'white', fontFamily: 'Poppins-SemiBold'}}
          btnStyle={{
            borderRadius: width * 0.09,
            borderWidth: 2,
            borderColor: 'white',
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height,
    alignSelf: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.75,
    height: height * 0.5,
    marginTop: height * 0.1,
  },
});

export default connect(null, actions)(Splash);
