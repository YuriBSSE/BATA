import Modal from 'react-native-modal';
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import colors from '../assets/colors';
import Heading from '../components/Heading';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';

const {width, height} = Dimensions.get('window');

const DisplayNameChangeModal = ({
  value,
  setValue,
  isModalVisible,
  setIsModalVisible,
}) => {
  const [text, setText] = useState(value);
  return (
    <Modal
      isVisible={isModalVisible}
      swipeDirection={'up'}
      onSwipeMove={p => setIsModalVisible(false)}>
      <View style={styles.container}>
        <Heading
          fontType="semi-bold"
          passedStyle={[styles.label]}
          title="Change Display Name"
        />
        <Inputbox
          value={text}
          setTextValue={setText}
          passedStyle={styles.inputStyle}
          // placeholderTilte="User Name"
        />
        {text?.length === 0 && (
          <Heading
            passedStyle={[styles.label, {color: 'red', fontSize: width * 0.035}]}
            title="Name can't be empty."
          />
        )}
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
});
