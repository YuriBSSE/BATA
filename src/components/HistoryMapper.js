import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Heading from './Heading';
import colors from '../assets/colors';
import IconComp from './IconComp';
import moment from 'moment';
const {width, height} = Dimensions.get('window');

const HistoryMapper = ({item, index}) => {
  return (
    <View style={styles.container}>
      {/* initiator  */}

      {/* Event Heading  */}
      <View style={styles.headingView}>
        <Heading
          title={item?.occasion}
          passedStyle={styles.occasionText}
          fontType={'semi-bold'}
        />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.locationView}>
          <IconComp
            type="Ionicons"
            name="person-circle"
            iconStyle={styles.locationIcon}
          />
          <Heading
            title={`Initiator:`}
            passedStyle={{
              fontSize: width * 0.04,
              color: 'grey',
              marginLeft: width * 0.02,
            }}
          />
          <Heading
            title={item?.name}
            passedStyle={{
              fontSize: width * 0.04,
              color: 'black',
              marginLeft: width * 0.02,
            }}
          />
        </View>
        {/* Language View  */}
        <View style={styles.locationView}>
          <IconComp
            type="FontAwesome"
            name="language"
            iconStyle={styles.locationIcon}
          />
          <Heading
            title={item?.nativeLanguage}
            passedStyle={{
              fontSize: width * 0.04,
              color: 'black',
              marginLeft: width * 0.02,
            }}
          />
          <Heading
            title="-"
            passedStyle={{
              fontSize: width * 0.04,
              color: 'black',
              marginLeft: width * 0.02,
            }}
          />
          <Heading
            title={item?.translationInto}
            passedStyle={{
              fontSize: width * 0.04,
              color: 'black',
              marginLeft: width * 0.02,
            }}
          />
        </View>

        {/* Event Duration  */}
        <View style={styles.locationView}>
          <IconComp
            type="MaterialIcons"
            name="event-note"
            iconStyle={styles.locationIcon}
          />
          <Heading
            title={`${moment(item?.startTime).format('MMM/DD/YYYY')}`}
            passedStyle={{
              fontSize: width * 0.04,
              color: 'black',
              marginLeft: width * 0.02,
            }}
          />
          <Heading
            title="-"
            passedStyle={{
              fontSize: width * 0.04,
              color: 'black',
              marginLeft: width * 0.02,
            }}
          />
          <Heading
            title={`${moment(item?.endTime).format('MMM/DD/YYYY')}`}
            passedStyle={{
              fontSize: width * 0.04,
              color: 'black',
              marginLeft: width * 0.02,
            }}
          />
        </View>

        {/* Location View  */}
        <View style={styles.locationView}>
          <IconComp
            type="MaterialIcons"
            name="location-on"
            iconStyle={styles.locationIcon}
          />
          <Heading
            title={item?.translationAddress}
            passedStyle={styles.locationAddress}
          />
        </View>

        <View>
          <Heading
            title={`Additional Information:`}
            passedStyle={{
              fontSize: width * 0.04,
              color: 'grey',
              marginLeft: width * 0.02,
            }}
          />
          <Heading
            title={item?.additionalInformation}
            passedStyle={{
              fontSize: width * 0.04,
              color: 'black',
              marginLeft: width * 0.02,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HistoryMapper;

const styles = StyleSheet.create({
  container: {
    marginVertical: height * 0.02,
    backgroundColor: 'white',
    width: width * 0.9,
  },
  cardBody: {
    backgroundColor: 'white',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderColor: colors.themePurple1,
    borderWidth: 1,
    borderBottomLeftRadius: width * 0.02,
    borderBottomRightRadius: width * 0.02,
  },
  headingView: {
    paddingHorizontal: width * 0.04,
    backgroundColor: colors.themePurple1,
    paddingVertical: height * 0.01,
    borderTopLeftRadius: width * 0.02,
    borderTopRightRadius: width * 0.02,
  },
  locationView: {
    flexDirection: 'row',
    paddingVertical: height * 0.01,
  },
  occasionText: {
    color: 'white',
    fontSize: width * 0.04,
  },
  locationAddress: {
    color: 'black',
    fontSize: width * 0.04,
    marginLeft: width * 0.01,
  },

  locationIcon: {
    color: colors.themePurple1,
    fontSize: width * 0.06,
  },
});
