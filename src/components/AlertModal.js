import Modal from 'react-native-modal';
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import colors from '../assets/colors';
import Heading from './Heading';
import Inputbox from './Inputbox';
import LottieView from 'lottie-react-native';
import Button from './Button';

const {width, height} = Dimensions.get('window');

const AlertModal = ({
  title,
  message,
  isModalVisible,
  setIsModalVisible,
  buttonText,
  onPress,
  showLoader,
}) => {
  return (
    <View>
      <StatusBar translucent={false} backgroundColor="black" />
      <Modal isVisible={isModalVisible}>
        <View style={styles.container}>
          <Heading
            passedStyle={styles.label}
            title={title ? title : 'Alert'}
            fontType="semi-bold"
          />

          {message?.length > 0 && (
            <Heading passedStyle={styles.message} title={message} />
          )}
          {/* Buttons Container  */}
          <View style={styles.flexRow}>
            {showLoader ? (
              <View style={styles.requestingView}>
                <LottieView
                  speed={1}
                  style={styles.lottieStyle}
                  autoPlay
                  loop
                  source={require('../assets/Lottie/purple-loading-2.json')}
                />
                <Heading
                  title="Please Wait..."
                  passedStyle={styles.requestLabel}
                />
              </View>
            ) : (
              <Button
                title={buttonText || 'OK'}
                onBtnPress={() => {
                  if (onPress) {
                    onPress();
                  } else {
                    setIsModalVisible(false);
                  }
                }}
                isBgColor={false}
                btnStyle={styles.btnStyle}
                btnTextStyle={styles.btnTextStyle}
              />
            )}

            {/* <Button
              title="CANCEL"
              onBtnPress={() => {
                setIsModalVisible(false);
              }}
              isBgColor={false}
              btnStyle={styles.cancelBtnStyle}
              btnTextStyle={styles.cancelBtnTextStyle}
            /> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: width * 0.9,
    borderRadius: width * 0.06,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  label: {
    color: 'black',
    fontSize: width * 0.05,
  },
  message: {
    color: 'grey',
    fontSize: width * 0.04,
    marginVertical: height * 0.02,
  },
  inputStyle: {
    borderBottomWidth: 1,
    width: width * 0.8,
    fontSize: width * 0.04,
    marginLeft: 0,
    paddingLeft: 0,
    borderRadius: 0,
  },
  btnStyle: {
    backgroundColor: colors.themePurple1,
    borderRadius: width * 0.025,
    // width: width * 0.35,
    margin: 0,
  },
  cancelBtnStyle: {
    borderRadius: width * 0.025,
    width: width * 0.35,
    borderWidth: 1,
    borderColor: colors.themePurple1,
    margin: 0,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.045,
    fontFamily: 'Poppins-SemiBold',
  },
  cancelBtnTextStyle: {
    color: colors.themePurple1,
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.04,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // width: width * 0.75,
    minWidth: width * 0.75,
  },
  inputField: {
    marginVertical: height * 0.03,
    height: height * 0.23,
    // backgroundColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1.2,
    borderColor: colors.themePurple1,
    borderRadius: width * 0.05,
    fontSize: width * 0.04,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.025,
    textAlignVertical: 'top',
    fontFamily: 'Poppins-Regular',
  },
  requestingView: {
    backgroundColor: 'white',
    borderRadius: width * 0.025,
    paddingVertical: height * 0.015,
    width: width * 0.75,
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.themePurple1,
  },
  lottieStyle: {
    height: height * 0.13,
    position: 'absolute',
    marginVertical: -30,
    bottom: height * 0.032,
    left: width * 0.01,
  },
  requestLabel: {
    color: colors.themePurple1,
    fontSize: width * 0.05,
    marginLeft: width * 0.08,
    fontFamily: 'Poppins-SemiBold',
  },
});
