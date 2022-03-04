import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import colors from '../assets/colors';
import Button from '../components/Button';
import Header from '../components/Header';
import IconComp from '../components/IconComp';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppStatusBar from '../components/AppStatusBar';
import colors from '../assets/colors';
const {width, height} = Dimensions.get('window');

const Translator = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [message, setMessage] = useState('');
  const languages = [
    {label: 'Langugae 1', value: 'Langugae 1'},
    {label: 'Langugae 2', value: 'Langugae 2'},
    {label: 'Langugae 3', value: 'Langugae 3'},
    {label: 'Langugae 4', value: 'Langugae 4'},
    {label: 'Langugae 5', value: 'Langugae 5'},
  ];

  //   Submit Button Handler
  const _onSubmitPress = () => {
  };

  // My Location Handler
  const _onMyLocationPress = () => {
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1}}>
      {/* <AppStatusBar backgroundColor={colors.themePurple1} barStyle="light-content" /> */}
      {/* Header  */}
      <Header showBackBtn={true} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: height * 0.02,
          paddingBottom: 100,
        }}>
        {/* Location Search  */}
        <GooglePlacesAutocomplete
          placeholder="Location"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
          }}
          query={{
            key: 'YOUR API KEY',
            language: 'en',
          }}
          renderLeftButton={() => (
            <IconComp
              name="location-pin"
              type="Entypo"
              iconStyle={styles.iconStyle}
            />
          )}
          renderRightButton={() => (
            <TouchableOpacity onPress={() => _onMyLocationPress()}>
              <IconComp
                name="my-location"
                type="MaterialIcons"
                iconStyle={styles.myLocationIconStyle}
              />
            </TouchableOpacity>
          )}
          styles={{
            textInputContainer: {
              width: width * 0.9,
              borderRadius: width * 0.04,
              borderWidth: 1.2,
              backgroundColor: 'rgba(0,0,0,0.02)',
              height: height * 0.084,
              borderColor: colors.themePurple1,
            },
            textInput: {
              height: height * 0.084,
              color: '#5d5d5d',
              backgroundColor: 'rgba(0,0,0,0.03)',
              fontSize: width * 0.04,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />

        {/* Langugae Dropdown  */}
        <View style={styles.dropdown}>
          
          <Picker
            mode="dropdown"
            dropdownIconColor="rgba(0,0,0,0.03)"
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            {languages.map((item, i) => {
              return (
                <Picker.Item key={i} label={item.label} value={item.value} />
              );
            })}
          </Picker>
        </View>

        {/* Special Message  */}
        <TextInput
          value={message}
          onChangeText={val => setMessage(val)}
          numberOfLines={8}
          multiline={true}
          placeholder={'Special Message'}
          style={styles.inputField}
        />

        {/* Map  */}
        <Image
          source={require('../assets/Images/map.png')}
          style={styles.map}
        />

        <Button
          title="Submit"
          onBtnPress={() => _onSubmitPress()}
          btnStyle={styles.btnStyle}
          isBgColor={false}
        />
      </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Translator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  dropdown: {
    marginTop: height * 0.03,
    paddingLeft: width * 0.03,
    borderWidth: 1.2,
    borderColor: colors.themePurple1,
    borderRadius: width * 0.04,
    width: width * 0.9,
    backgroundColor: 'rgba(0,0,0,0.05)',
    height: height * 0.085,
  },
  inputField: {
    marginTop: height * 0.03,
    height: height * 0.23,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1.2,
    borderColor: colors.themePurple1,
    borderRadius: width * 0.05,
    width: width * 0.9,
    fontSize: width * 0.04,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.025,
    textAlignVertical: 'top',
  },
  map: {
    marginTop: height * 0.02,
    width: width * 0.9,
    height: height * 0.4,
  },
  btnStyle: {
    backgroundColor: colors.themePurple1,
    borderRadius: width * 0.07,
  },
  iconStyle: {
    color: 'grey',
    fontSize: width * 0.06,
    alignSelf: 'center',
    paddingLeft: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  languageStyle: {
    color: 'grey',
    fontSize: width * 0.06,
    alignSelf: 'center',
    paddingLeft: width * 0.05,
    paddingVertical: height * 0.02,
  },
  myLocationIconStyle: {
    color: 'grey',
    fontSize: width * 0.05,
    marginTop: height * 0.005,
    paddingRight: width * 0.04,
    paddingVertical: height * 0.02,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
});
