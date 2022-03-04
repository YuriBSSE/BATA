import Modal from 'react-native-modal';
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import colors from '../assets/colors';
import Heading from '../components/Heading';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';
import {Rating} from 'react-native-ratings';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const DisplayNameChangeModal = ({
  isModalVisible,
  setIsModalVisible,
  onPress,
  isLoading,
}) => {
  const [review, setReview] = useState();
  const [ratings, setRatings] = useState(false);

  return (
    <Modal
      isVisible={isModalVisible}
      swipeDirection={'up'}
      onSwipeMove={p => setIsModalVisible(false)}
      >
      <View style={styles.container}>
        <Heading
          fontType="semi-bold"
          passedStyle={[styles.label]}
          title="How was my service?"
        />
        <Rating
          type="star"
          fractions={true}
          imageSize={40}
          startingValue={ratings}
          onFinishRating={e => setRatings(e)}
          ratingColor="orange"
          startingValue={ratings}
        />

        {/* <Inputbox
          value={review}
          setTextValue={setReview}
          passedStyle={styles.inputStyle}
          placeholderTilte="Your text here"
          placeholderTextColor={'grey'}
        /> */}
        <TextInput
          value={review}
          onChangeText={val => setReview(val)}
          numberOfLines={5}
          multiline={true}
          placeholder={'Your review here'}
          style={styles.inputField}
        />

        {/* Buttons Container  */}
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
          <View style={styles.flexRow}>
            <Button
              title="SUBMIT REVIEW"
              onBtnPress={() => {
                onPress(review, ratings);
              }}
              isBgColor={false}
              btnStyle={styles.btnStyle}
              btnTextStyle={styles.btnTextStyle}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default DisplayNameChangeModal;

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
    fontSize: width * 0.06,
    marginVertical: height * 0.02,
    alignSelf: 'center',
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.themePurple1,
    width: width * 0.8,
    borderColor: 'white',
    marginTop: 0,
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
    width: width * 0.75,
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
  inputField: {
    marginVertical: height * 0.03,
    height: height * 0.18,
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
  lottieStyles: {
    height: height * 0.13,
    position: 'absolute',
    left: width * 0.1,
    right: 0,
    // top: height * -0.017,
  },
  loadingComponent: {
    borderRadius: width * 0.025,
    borderWidth: 1,
    borderColor: colors.themePurple1,
    margin: 0,
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.themePurple1,
    backgroundColor: colors.themePurple1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.07,
    alignSelf: 'center',
    width: width * 0.75,
    // marginVertical: height * 0.02,
  },
  savingText: {
    color: 'white',
    position: 'absolute',
    left: width * 0.18,
    top: height * 0.017,
    fontSize: width * 0.045,
  },
});
