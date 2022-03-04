import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Heading from './Heading';
import {Rating} from 'react-native-ratings';
import moment from 'moment';
import colors from '../assets/colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ReviewsMapper = ({item, index}) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <View style={styles.container}>
      {/* Name and Image  */}
      <View style={styles.imageAndNameContainer}>
        <Image source={item.photo} style={styles.photo} resizeMode="contain" />
        <View style={{justifyContent: 'center', marginLeft: width * 0.03}}>
          <Heading
            title={item.name}
            fontType="medium"
            passedStyle={styles.name}
          />
          <Heading
            title={moment(item.createdAt).fromNow()}
            fontType="medium"
            passedStyle={styles.date}
          />
        </View>
      </View>

      {/* Review Message  */}
      <Heading
        title={
          item.reviewMessage.length > 125 && !showMore
            ? `${item.reviewMessage.substring(0, 125)}...`
            : item.reviewMessage
        }
        fontType="regular"
        passedStyle={styles.reviewMessage}
      />
      <TouchableOpacity activeOpacity={0.8} onPress={() => setShowMore(!showMore)}>
        <Heading
          title={
            item.reviewMessage.length > 125 && !showMore
              ? 'Read More'
              : 'Read Less'
          }
          passedStyle={styles.showmore}
        />
      </TouchableOpacity>

      {/* Ratings  */}
      <View style={styles.ratingsView}>
        <Rating
          type="star"
          fractions={true}
          imageSize={25}
          readonly={true}
          tintColor="rgba(242, 241, 241, 1)"
          startingValue={item.ratings}
        />
        <Heading
          title={`${item.ratings} out of 5`}
          fontType="regular"
          passedStyle={styles.ratingCount}
        />
      </View>
    </View>
  );
};

export default ReviewsMapper;

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: height * 0.01,
    backgroundColor: 'white',
    paddingVertical: height * 0.02,
    marginHorizontal: width * 0.05,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.03,
  },
  imageAndNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  photo: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.18,
    // backgroundColor:'red'
  },
  name: {
    fontSize: width * 0.045,
    color: 'black',
  },
  ratingCount: {
    fontSize: width * 0.04,
    color: 'black',
    marginTop: height * 0.006,
  },
  reviewMessage: {
    color: 'grey',
    fontSize: width * 0.035,
    paddingVertical: height * 0.01,
  },
  date: {
    color: 'grey',
    fontSize: width * 0.035,
    // paddingVertical: height * 0.01,
  },
  ratingsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginHorizontal: width * 0.07,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.08,
  },
  reviewMessageView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showmore: {
    color: colors.themePurple1,
    fontSize: width * 0.04,
    alignSelf: 'center',
    marginBottom: height * 0.01,
  },
});
