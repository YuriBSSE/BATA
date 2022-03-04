import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../assets/colors';
import Heading from './Heading';

const {width, height} = Dimensions.get('window');

const HomeOptions = ({item, index, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => onPress(item, index)}>
      <View style={styles.imageContainer}>
        <Image source={item?.image} style={styles.imageStyle} />
      </View>
      <Heading passedStyle={styles.textStyle} title={item?.text} fontType="regular"/>
    </TouchableOpacity>
  );
};

export default HomeOptions;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginHorizontal: width * 0.02,
    width: width * 0.42,
  },
  imageContainer: {
    paddingVertical: height * 0.032,
    paddingHorizontal: width * 0.12,
    marginBottom: height * 0.018,
    backgroundColor: colors?.themePurple1,
    borderRadius: width * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: width * 0.1,
    height: height * 0.05,
  },
  textStyle: {
    fontSize: width * 0.04,
    color: 'black',
    textTransform: 'capitalize',
  },
});
