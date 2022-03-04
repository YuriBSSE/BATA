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
import Button from './Button';

const {width, height} = Dimensions.get('window');

const NoteToTranslatorModal = ({
  value,
  setValue,
  isModalVisible,
  setIsModalVisible,
}) => {
  const [text, setText] = useState(value);
  return (
    <View>
      <StatusBar translucent={false} backgroundColor="black" />
      <Modal
        isVisible={isModalVisible}
        // statusBarTranslucent
        swipeDirection={'up'}
        onSwipeMove={p => setIsModalVisible(false)}>
        <View style={styles.container}>
          <Heading
            passedStyle={[styles.label]}
            title="Note To Translator"
            fontType="semi-bold"
          />

          {/* Special Message  */}
          <TextInput
            value={text}
            onChangeText={val => setText(val)}
            numberOfLines={8}
            multiline={true}
            placeholder={'Special Message'}
            style={styles.inputField}
          />
          {/* Buttons Container  */}
          <View style={styles.flexRow}>
            <Button
              title="DONE"
              onBtnPress={() => {
                setValue(text);
                setIsModalVisible(false);
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
        </View>
      </Modal>
    </View>
  );
};

export default NoteToTranslatorModal;

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
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: width * 0.75,
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
});
