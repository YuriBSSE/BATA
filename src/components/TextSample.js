import React, {useEffect, useState, useRef} from 'react';
import {View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const TextSample = ({
  Label,
  Color,
  Size,
  TextAlign,
  NumberOfLines,
  Font,
  TextDecorationLine,
  TextTransform,
}) => {
  return (
    <Text
      numberOfLines={NumberOfLines}
      style={{
        color: Color,
        fontFamily: Font,
        fontSize: Size,
        textAlign: TextAlign,
        textDecorationLine: TextDecorationLine,
        textTransform: TextTransform,
        letterSpacing: 1,
      }}>
      {Label}
    </Text>
  );
};
export default TextSample;
