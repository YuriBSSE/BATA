import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import TextSample from './TextSample';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../assets/colors';
import Modal from 'react-native-modal';

const {width, height} = Dimensions.get('window');

const Loading = ({isModalVisible}) => {
  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.lottieContainer}>
        <LottieView
          speed={1}
          style={styles.lottieStyles}
          autoPlay
          colorFilters={'blue'}
          loop
          source={require('../assets/Lottie/purple-loading-2.json')}
        />

      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  lottieContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // flex: 1,
    // alignContent: 'center',
  },
  lottieStyles: {
    height: height * 0.4,
    // width: width * 0.2,
    // backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
