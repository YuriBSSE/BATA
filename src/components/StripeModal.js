import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import colors from '../assets/colors';
import Heading from '../components/Heading';
import Button from '../components/Button';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const StripeModal = ({
  onPress,
  isModalVisible,
  setIsModalVisible,
  setId,
  isLoading,
}) => {
  const [isCardComplete, setIsCardComplete] = useState(false);
  const {createToken} = useStripe();
  useEffect(() => {
console.log(isCardComplete);
  },[isCardComplete])
  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.container}>
        <Heading
          fontType="semi-bold"
          passedStyle={[styles.label]}
          title="Enter Card Details"
        />
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: 'white',
            textColor: colors.themePurple1,
            borderWidth: 1,
            borderColor: colors.themePurple1,
            borderRadius: 5,
            fontSize: 16,
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={cardDetails => {
            console.log('Card complete: ', cardDetails.complete);
            if (cardDetails.complete) {
              createToken(cardDetails).then(res => {
                console.log('Stripe Card Response: ', res);
                setIsCardComplete(cardDetails.complete);
                setId(res.token.id);
              });
            }
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        />

        {/* Buttons Container  */}
        {isLoading ? (
          <View style={styles.loadingComponent} activeOpacity={1}>
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
          <View style={styles.flexRow}>
            <Button
              title="BUY"
              onBtnPress={() => {
                if (!isCardComplete) {
                  return;
                } else {
                  onPress();
                }
              }}
              isBgColor={false}
              btnStyle={styles.btnStyle}
              btnTextStyle={styles.btnTextStyle}
            />

            <Button
              title="CANCEL"
              onBtnPress={() => {
                setIsModalVisible(false);
              }}
              isBgColor={false}
              btnStyle={styles.cancelBtnStyle}
              btnTextStyle={styles.cancelBtnTextStyle}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default StripeModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.06,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  label: {
    color: 'black',
    fontSize: width * 0.05,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.themePurple1,
    width: width * 0.8,
    borderColor: 'white',
    fontSize: width * 0.04,
    marginLeft: 0,
    paddingLeft: 0,
    paddingVertical: 6,
    color: 'black',
    borderRadius: 0,
  },
  btnStyle: {
    backgroundColor: colors.themePurple1,
    borderRadius: width * 0.025,
    width: width * 0.35,
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
    fontSize: width * 0.04,
  },
  cancelBtnTextStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.04,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // backgroundColor: 'red',
    width: width * 0.75,
  },
  lottieStyles: {
    height: height * 0.13,
    position: 'absolute',
    left: width * 0.1,
    right: 0,
    // top: height * -0.015,
  },
  loadingComponent: {
    borderRadius: width * 0.02,
    position: 'relative',
    alignSelf: 'center',
    backgroundColor: colors.themePurple1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.08,
    width: width * 0.75,
    marginTop: 5,
  },
  savingText: {
    color: 'white',
    position: 'absolute',
    left: width * 0.18,
    top: height * 0.022,
    fontSize: width * 0.045,
  },
});
