import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import Button from './Button';
import Heading from './Heading';

const {width, height} = Dimensions.get('window');
const CustomDropdownModal = ({
  array,
  onPress,
  isModalVisible,
  setIsModalVisible,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      swipeDirection="down"
      swipeThreshole={100}
      statusBarTranslucent
      onSwipeMove={p => setIsModalVisible(false)}
      animationIn="bounceInDown"
      animationOut="bounceInDown"
      onBackdropPress={() => setIsModalVisible(false)}
      style={{margin: 0}}
    >
      <View style={styles.container}>
        <FlatList
          data={array}
          keyExtractor={item => item.id?.toString()}
          contentContainerStyle={styles.flatListContentStyle}
          showsVerticalScrollIndicator={false}
          style={{marginTop: 15}}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onPress(item)}
              style={styles.labelWrapper}>
              <Heading
                title={item.label || item.name || item.language_name}
                passedStyle={styles.labelStyle}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

export default CustomDropdownModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    bottom: 0,
    backgroundColor: 'white',
    position: 'absolute',
    height: 200,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    // padding: 0, margin: 0
    // width: width * 0.9,
    // height: height * 0.5,
    // borderRadius: width * 0.06,
    // paddingVertical: height * 0.05,
    // paddingHorizontal: width * 0.05,
  },
  flatListContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  labelStyle: {
    fontSize: width * 0.05,
    color: 'black',
    textAlign: 'center',
  },
  labelWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    width: width,
    paddingVertical: height * 0.02,
    marginVertical: 5,
  },
});
