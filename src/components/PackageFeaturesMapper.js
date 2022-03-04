import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import colors from '../assets/colors';
import Heading from './Heading';
import IconComp from './IconComp';
const {width, height} = Dimensions.get('window');

const PackageFeaturesMapper = ({item, index}) => {
  return (
    <View style={styles.container}>
      <IconComp
        name="checkcircle"
        type="AntDesign"
        iconStyle={styles.iconStyle}
      />
      <Heading title={item} passedStyle={styles.featureStyle} fontType="regular"/>
    </View>
  );
};

export default PackageFeaturesMapper;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignItems: 'center',
    paddingVertical:height* 0.01,
  },
  featureStyle: {
    color: 'white',
    fontSize: width * 0.05,
    textTransform:'capitalize',
    fontWeight: '600',
    paddingLeft: width * 0.025,
  },
  iconStyle: {
    fontSize: width * 0.05,
    marginTop:height * 0.008,
    color: colors.themeYellow,
  },
});
