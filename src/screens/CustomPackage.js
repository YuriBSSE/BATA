import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppStatusBar from '../components/AppStatusBar';
import * as actions from '../store/actions/actions';
import colors from '../assets/colors';
import {connect} from 'react-redux';
import Heading from '../components/Heading';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CustomPackage = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        {/* <AppStatusBar
          backgroundColor={colors.themePurple1}
          barStyle="light-content"
        /> */}
        <Header title="back" showBackBtn={true} navigation={navigation} />
      </SafeAreaView>
    </View>
  );
};

export default CustomPackage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
