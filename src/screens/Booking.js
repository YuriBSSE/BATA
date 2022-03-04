import moment from 'moment';
import React, {useState} from 'react';
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
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import colors from '../assets/colors';
import Button from '../components/Button';
import CustomDropdownModal from '../components/CustomDropdownModal';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppStatusBar from '../components/AppStatusBar';
const {width, height} = Dimensions.get('window');

const Booking = ({navigation}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState('New York, USA');
  const [selectedLanguage, setSelectedLanguage] = useState('Spanish (ES)');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const languages = [
    {_id: 4, label: 'Chinese (ES)', value: 'Langugae 4'},
    {_id: 2, label: 'Porteguese (ES)', value: 'Langugae 2'},
    {_id: 3, label: 'Russian (ES)', value: 'Langugae 3'},
    {_id: 5, label: 'Romanian (ES)', value: 'Langugae 5'},
    {_id: 1, label: 'Spanish (ES)', value: 'Langugae 1'},
  ];

  const _onLanguageSelectionPress = item => {
    setSelectedLanguage(item.label);
    setShowLanguageDropdown(false);
  };

  const _onCancelPress = () => {
  };

  const _onBookNowPress = () => {
    navigation.navigate('Interpreter');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1}}>
      {/* <AppStatusBar backgroundColor={colors.themePurple1} barStyle="light-content" /> */}
      {/* <StatusBar translucent backgroundColor="transparent" /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Event View  */}
        <TouchableOpacity
          style={styles.rowView}
          activeOpacity={0.8}
          onPress={() => {
            setShowDatePicker(true);
          }}>
          <TouchableOpacity
            style={styles.dateInfoView}
            activeOpacity={0.7}
            onPress={() => {
              setShowDatePicker(true);
            }}>
            <Heading
              title={moment(date).format('dddd - MMMM - YYYY')}
              passedStyle={styles.additionalInfoText}
            />
          </TouchableOpacity>

          <IconComp
            type="Ionicons"
            name="calendar"
            iconStyle={styles.eventStyle}
          />
        </TouchableOpacity>

        {/* Selected Timing View  */}
        <View style={styles.dateView}>
          <Heading
            title={`From ${moment(new Date()).format('HH:MM A')}`}
            passedStyle={styles.dateLanguage}
          />
          <IconComp
            type="AntDesign"
            name="caretright"
            iconStyle={styles.caretRightLanguage}
          />
          <Heading
            title={`To ${moment(date).format('HH:MM A')}`}
            passedStyle={styles.dateLanguage}
          />
        </View>

        {/* Map  */}
        <Image
          source={require('../assets/Images/map.png')}
          style={styles.map}
        />

        {/* Address View  */}
        <Heading title={`Address`} passedStyle={styles.addressLanguage} />
        <View style={styles.rowViewLocation}>
          <IconComp
            type="Entypo"
            name="location-pin"
            iconStyle={styles.locationIconStyle}
          />
          <Heading
            title={selectedLocation}
            passedStyle={styles.locationLabel}
          />
        </View>

        {/* Langugae Dropdown  */}
        <TouchableOpacity
          style={styles.languageInfoView}
          activeOpacity={0.7}
          onPress={() => setShowLanguageDropdown(true)}>
          <View style={styles.rowLanguageView}>
            <IconComp
              type="FontAwesome"
              name="language"
              iconStyle={styles.menuStyle}
            />
            <Heading
              title={selectedLanguage ? selectedLanguage : 'Language'}
              passedStyle={styles.langInfoText}
            />
          </View>
          <IconComp
            type="AntDesign"
            name="caretdown"
            iconStyle={styles.caretdown}
          />
        </TouchableOpacity>

        {/* Selected Languages Translation  */}
        <View style={styles.transaltionView}>
          <Heading
            title={'English (ES)'}
            passedStyle={styles.translationLanguage}
          />
          <IconComp
            type="AntDesign"
            name="caretright"
            iconStyle={styles.caretRightLanguage}
          />
          <Heading
            title={selectedLanguage}
            passedStyle={styles.translationLanguage}
          />
        </View>

        {/* Time and Payment View  */}
        <View style={styles.timeAndPaymentView}>
          <View style={styles.columnView}>
            <IconComp
              type="MaterialCommunityIcons"
              name="clock-time-four"
              iconStyle={styles.locationIconStyle}
            />
            <Heading title={'4 Hours'} passedStyle={styles.timeLabel} />
          </View>
          <View style={styles.columnView}>
            <IconComp
              type="Foundation"
              name="dollar"
              iconStyle={styles.dollarIconStyle}
            />
            <Heading title={'$800.00'} passedStyle={styles.dollarLabel} />
          </View>
        </View>

        <View
          style={[styles.rowLanguageView, {paddingTop: 20, paddingBottom: 50}]}>
          <Button
            title="Cancel"
            onBtnPress={() => _onCancelPress()}
            btnStyle={styles.cancelBtnStyle}
            isBgColor={false}
            btnTextStyle={{color: colors.themePurple1}}
          />
          <Button
            title="Book Now"
            onBtnPress={() => _onBookNowPress()}
            btnStyle={styles.btnStyle}
            isBgColor={false}
          />
        </View>
      </ScrollView>

      {/* Date Picker  */}
      <DatePicker
        modal
        // mode="date"
        open={showDatePicker}
        date={date}
        onConfirm={date => {
          setShowDatePicker(false);
          setDate(date);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />

      {showLanguageDropdown && (
        <CustomDropdownModal
          array={languages}
          onPress={_onLanguageSelectionPress}
          isModalVisible={showLanguageDropdown}
          setIsModalVisible={setShowLanguageDropdown}
        />
      )}
    </SafeAreaView>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: colors.themePurple1,
    borderRadius: width * 0.07,
    width: width * 0.35,
  },
  cancelBtnStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.themePurple1,
    borderRadius: width * 0.07,
    width: width * 0.35,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.05,
    justifyContent: 'center',
  },
  rowViewLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInfoView: {
    marginVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width * 0.75,
    borderRadius: width * 0.04,
    borderWidth: 1.2,
    height: height * 0.084,
    borderColor: colors.themePurple1,
    position: 'relative',
  },
  eventStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.07,
    alignSelf: 'center',
    paddingLeft: width * 0.03,
    paddingVertical: height * 0.02,
  },
  dateView: {
    marginVertical: height * 0.02,
    marginHorizontal: width * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateLanguage: {
    fontSize: width * 0.045,
    color: 'black',
  },
  caretRightLanguage: {
    color: colors.themePurple1,
    fontSize: width * 0.03,
    marginHorizontal: width * 0.02,
  },
  additionalInfoText: {
    color: '#5d5d5d',
    fontSize: width * 0.045,
  },
  map: {
    width: width * 0.9,
    height: height * 0.4,
    borderRadius: width * 0.12,
  },
  addressLanguage: {
    fontSize: width * 0.05,
    color: 'black',
    fontWeight: '700',
  },
  locationLabel: {
    color: 'black',
    fontSize: width * 0.045,
  },
  locationIconStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.07,
    alignSelf: 'center',
    paddingVertical: height * 0.02,
  },
  menuStyle: {
    color: 'white',
    fontSize: width * 0.04,
    paddingHorizontal: width * 0.05,
  },
  languageInfoView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width * 0.9,
    borderRadius: width * 0.04,
    borderWidth: 1.2,
    height: height * 0.084,
    borderColor: colors.themePurple1,
    backgroundColor: colors.themePurple1,
    position: 'relative',
  },
  langInfoText: {
    color: 'white',
    fontSize: width * 0.04,
  },
  caretdown: {
    color: 'white',
    fontSize: width * 0.03,
    position: 'absolute',
    bottom: height * 0.03,
    right: width * 0.045,
  },
  rowLanguageView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transaltionView: {
    marginVertical: height * 0.035,
    marginHorizontal: width * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  translationLanguage: {
    fontSize: width * 0.045,
    color: 'black',
  },
  timeAndPaymentView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: colors.themePurple1,
    borderRadius: width * 0.09,
    paddingVertical: height * 0.03,
  },
  columnView: {
    flexDirection: 'column',
    justifyContent: 'center',
    // width:100, height: 100
    marginHorizontal: width * 0.13,
  },
  timeLabel: {
    color: '#5d5d5d',
    fontSize: width * 0.045,
  },

  dollarIconStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.09,
    alignSelf: 'center',
    paddingVertical: height * 0.01,
  },
  dollarLabel: {
    color: colors.themePurple1,
    fontSize: width * 0.05,
    fontWeight: '800',
  },
});
