import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PROFILE_IMAGE from '../assets/Images/profile-image.jpeg';
import React, {useState} from 'react';
import Heading from '../components/Heading';
import {Rating, AirbnbRating} from 'react-native-ratings';
import IconComp from '../components/IconComp';
import colors from '../assets/colors';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppStatusBar from '../components/AppStatusBar';

const {width, height} = Dimensions.get('window');

const Interpreter = ({navigation}) => {
  const [rateValue, setRateValue] = useState(5);

  const _onPressJoinDate = () => {
  };

  const _onPressLanguages = () => {
  };

  const _onPressButton = item => {
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1}}>
      {/* <AppStatusBar backgroundColor={colors.themePurple1} barStyle="light-content" /> */}
      {/* <StatusBar translucent backgroundColor="transparent" /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Interpreter View  */}
        <View style={styles.interpreterView}>
          <Image
            resizeMode="contain"
            source={PROFILE_IMAGE}
            style={styles.imageStyle}
          />
          <View style={styles.rowView}>
            <Heading
              title="Interpreter John"
              passedStyle={styles.usernameStyle}
            />
            <Rating
              type="star"
              onFinishRating={rating => setRateValue(rating)}
              fractions={true}
              imageSize={20}
              startingValue={rateValue}
            />
          </View>
        </View>

        {/* Event View  */}
        <View style={styles.cardsWrapper}>
          {/* Join Date Card  */}
          <TouchableOpacity
            style={styles.eventCard}
            activeOpacity={0.8}
            onPress={() => _onPressJoinDate()}>
            <IconComp
              type="Ionicons"
              name="calendar"
              iconStyle={styles.eventStyle}
            />
            <Heading title="Join Date" passedStyle={styles.cardHeading} />
            <Heading
              title={moment().format('Do MMMM yyyy')}
              passedStyle={styles.cardDate}
            />
          </TouchableOpacity>

          {/* Languages Card  */}
          <TouchableOpacity
            style={styles.eventCard}
            activeOpacity={0.8}
            onPress={() => _onPressLanguages()}>
            <IconComp
              type="Ionicons"
              name="calendar"
              iconStyle={styles.eventStyle}
            />
            <Heading title="Languages" passedStyle={styles.cardHeading} />
            <Heading title={'Eng, Ger, Fr'} passedStyle={styles.cardDate} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileButtonsView}>
          {buttons.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.8}
              onPress={() => _onPressButton(item)}
              style={[styles.buttonWrapper]}>
              <IconComp
                type={item.iconType}
                name={item.iconName}
                iconStyle={styles.buttonIconStyle}
              />
              <Heading title={item.title} passedStyle={styles.buttonText} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Interpreter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  interpreterView: {
    paddingTop: height * 0.025,
    flexDirection: 'row',
    height: height * 0.18,
    width: width * 0.8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  imageStyle: {
    width: width * 0.18,
    borderRadius: width * 0.5,
  },
  usernameStyle: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: 'black',
  },
  rowView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: width * 0.04,
  },
  cardsWrapper: {
    marginHorizontal: width * 0.02,
    marginVertical: height * 0.024,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventCard: {
    width: width * 0.34,
    paddingVertical: height * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    borderRadius: width * 0.04,
  },
  eventStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.07,
    alignSelf: 'center',
    paddingBottom: height * 0.01,
  },
  cardHeading: {
    color: 'black',
    fontSize: width * 0.05,
    fontWeight: '700',
  },
  cardDate: {
    color: 'black',
    fontSize: width * 0.04,
    textAlign: 'center',
  },
  buttonWrapper: {
    paddingVertical: height * 0.03,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    width: width * 0.8,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    paddingLeft: 20,
    fontSize: width * 0.045,
  },
  buttonIconStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.05,
    alignSelf: 'center',
  },
  profileButtonsView: {
    marginTop: height * 0.03,
  },
});

const buttons = [
  {
    _id: 1,
    title: 'Change Language',
    route: '',
    iconType: 'FontAwesome',
    iconName: 'language',
  },
  {
    _id: 2,
    title: 'Change Phone no.',
    route: '',
    iconType: 'FontAwesome',
    iconName: 'phone',
  },
  {
    _id: 3,
    title: 'Payment',
    route: '',
    iconType: 'Entypo',
    iconName: 'credit-card',
  },
  {
    _id: 4,
    title: 'Interpreter Level',
    route: '',
    iconType: 'FontAwesome',
    iconName: 'phone',
  },
  {
    _id: 5,
    title: 'BATA Information',
    route: '',
    iconType: 'Foundation',
    iconName: 'info',
  },
];
