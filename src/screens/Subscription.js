import React from 'react';
import {View, Text} from 'react-native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppStatusBar from '../components/AppStatusBar';
import colors from '../assets/colors';
const Subscription = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <SafeAreaView style={{ flex: 1}}>
      {/* <AppStatusBar backgroundColor={colors.themePurple1} barStyle="light-content" /> */}
      <Header title="back" showBackBtn={true} navigation={navigation} />
      </SafeAreaView>
    </View>
  );
};

export default Subscription;
