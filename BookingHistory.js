import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppStatusBar from '../components/AppStatusBar';
import * as actions from '../store/actions/actions';
import colors from '../assets/colors';
import {connect} from 'react-redux';
import Heading from '../components/Heading';
import HistoryMapper from '../components/HistoryMapper';
import CurrentInterpreter from '../components/CurrentInterpreter';

const {width, height} = Dimensions.get('window');

const BookingHistory = ({navigation, UserReducer, getBookingHistory}) => {
  const accessToken = UserReducer?.accessToken;
  const bookingHistory = UserReducer?.bookingHistory;

  

  useEffect(() => {
    getBookingHistory(accessToken);
  }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        {/* <AppStatusBar
          backgroundColor={colors.themePurple1}
          barStyle="light-content"
        /> */}
        <Header title="History" navigation={navigation} />

        <FlatList
          data={bookingHistory}
          vertical
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id?.toString()}
          contentContainerStyle={styles.flatListContentContainerStyle}
          renderItem={({item, index}) => <CurrentInterpreter item={item} key={index}/>}
          ListFooterComponentStyle={{alignItems: 'center', marginTop:height * 0.02}}
          ListFooterComponent={() =>
            bookingHistory?.length === 0 && (
              <Heading
                title="No completed events."
                fontType={'semi-bold'}
                passedStyle={{
                  fontSize: width * 0.045,
                  color: 'black',
                }}
              />
            )
          }
          ListHeaderComponent={() => (
            <Heading
              title="Booking History"
              passedStyle={styles.heading2}
              fontType="bold"
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(BookingHistory);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    color: 'black',
    marginLeft: width * 0.08,
    fontSize: width * 0.08,
  },
  heading2: {
    color: colors.themePurple1,
    fontSize: width * 0.1,
  },
  flatListContentContainerStyle: {
    marginHorizontal: width * 0.05,
  },
  textStyle: {
    color: 'rgba(0,0,0,0.7)',
    textTransform: 'capitalize',
    fontSize: width * 0.045,
  },
});

const dummyData = [
  {
    _id: 1,
    translationAddress: 'Shereton Complex St.14 Bredihs Street No.14 Opp Crtas',
    additionalInformation: 'Group requires extra attention.',
    startTime: new Date(),
    endTime: new Date(),
    name: 'Weiß Schmitz',
    nativeLanguage: 'English (ES)',
    translationInto: 'Spanish (ES)',
    occasion: 'National Arts Council',
  },
  {
    _id: 2,
    translationAddress: 'Shereton Complex St.14 Bredihs Street No.14 Opp Crtas',
    additionalInformation: 'Group requires extra attention.',
    startTime: new Date(),
    endTime: new Date(),
    name: 'Köhler König',
    nativeLanguage: 'English (ES)',
    translationInto: 'Spanish (ES)',
    occasion: 'Expo Dubai 2021 ',
  },
  {
    _id: 3,
    translationAddress: 'Shereton Complex St.14 Bredihs Street No.14 Opp Crtas',
    additionalInformation: 'Group requires extra attention.',
    startTime: new Date(),
    endTime: new Date(),
    name: 'Schulze Huber',
    nativeLanguage: 'English (ES)',
    translationInto: 'Spanish (ES)',
    occasion: 'Georgia JJ Museum',
  },
  {
    _id: 4,
    translationAddress: 'Shereton Complex St.14 Bredihs Street No.14 Opp Crtas',
    additionalInformation: 'Group requires extra attention.',
    startTime: new Date(),
    endTime: new Date(),
    name: 'Möller Thomas',
    nativeLanguage: 'English (ES)',
    translationInto: 'Spanish (ES)',
    occasion: 'Independence Day',
  },
  {
    _id: 5,
    translationAddress: 'Shereton Complex St.14 Bredihs Street No.14 Opp Crtas',
    additionalInformation: 'Group requires extra attention.',
    startTime: new Date(),
    endTime: new Date(),
    name: 'Günther Böhm',
    nativeLanguage: 'English (ES)',
    translationInto: 'Spanish (ES)',
    occasion: 'Geneva Motor Show 2021',
  },
];
