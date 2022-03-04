import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import colors from '../assets/colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Button = ({
  title,
  onBtnPress,
  isBgColor = true,
  btnStyle,
  btnTextStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.btn,

        isBgColor
          ? styles.btnWithBgColor
          : btnStyle
          ? btnStyle
          : styles.btnWithOutBgColor,
      ]}
      onPress={() => {
        onBtnPress();
      }}>
      <Text
        style={[
          styles.text,
          isBgColor
            ? {color: colors.themePurple1}
            : btnTextStyle
            ? btnTextStyle
            : {color: 'white'},
          // {color: colors.themePurple1 },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: width * 0.05,
    // fontWeight: 'bold',
  },
  btn: {
    width: width * 0.8,
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    paddingVertical: height * 0.018,
    margin: 15,
  },
  btnWithBgColor: {
    backgroundColor: colors.themePurple,
  },
  btnWithOutBgColor: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 1,
    borderColor: colors.themePurple,
  },
});

export default Button;
