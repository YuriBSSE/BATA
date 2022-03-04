import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import colors from '../assets/colors';
import Button from '../components/Button';
import Heading from '../components/Heading';
import LottieView from 'lottie-react-native';
import IconComp from '../components/IconComp';
import * as actions from '../store/actions/actions';
import AppStatusBar from '../components/AppStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomDropdownModal from '../components/CustomDropdownModal';
import ConfirmTranslatorModal from '../components/ConfirmTranslatorModal';
import NoteToTranslatorModal from '../components/NoteToTranslatorModal';
import AlertModal from '../components/AlertModal';

const {width, height} = Dimensions.get('window');

const LanguageSelection = ({
  route,
  navigation,
  UserReducer,
  setErrorModal,
  bookTranslator,
  getAllLanguages,
}) => {
  const occasions = UserReducer?.occasions;
  const languages = UserReducer?.languages;
  const LIMIT = UserReducer?.userData?.current_package?.package_limit;
  const accessToken = UserReducer?.accessToken;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [noteToTranslator, setNoteToTranslator] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [showOccasionsDropdown, setShowOccasionsDropdown] = useState(false);
  const [showLanguagesDropdown, setShowLanguagesDropdown] = useState(false);
  const [showIncompleteFormAlert, setShowIncompleteFormAlert] = useState(false);
  const [showNoteToTranslatorModal, setShowNoteToTranslatorModal] =
    useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([
    {
      id: 1,
      primaryLang: UserReducer?.userData?.language,
      translationLang: languages[0],
    },
  ]);

  const _onLanguageSelectionPress = item => {
    const oldArray = [...selectedLanguages];
    const index = oldArray.findIndex(x => x.id === selectedOption.id);
    oldArray[index] = {
      ...oldArray[index],
      translationLang: item,
    };
    setSelectedLanguages(oldArray);
    setShowLanguagesDropdown(false);
  };

  const _onOccasionsSelectionPress = item => {
    setSelectedOccasion(item);
    setShowOccasionsDropdown(false);
  };

  const openConfirmBookModal = () => {
    navigation.navigate('ConfirmModal', {
      ...route.params,
      primary_language: UserReducer?.userData?.language,
      translating_language: selectedLanguages?.map(
        ele => ele?.translationLang?.language_name,
      ),
      occasion: selectedOccasion.name,
      note_to_translator: noteToTranslator,
    });
  };

  const _onNextPress = async () => {
    setIsLoading(true);
    if (selectedLanguages.length > 0 && selectedOccasion) {
      let languageAndQty = [];
      var map = selectedLanguages.reduce(
        (cnt, cur) => (
          (cnt[cur.translationLang.id] = cnt[cur.translationLang.id] + 1 || 1),
          cnt
        ),
        {},
      );
      for (var key of Object.keys(map)) {
        languageAndQty.push({
          language: key,
          qty: map[key],
        });
      }

      await bookTranslator(
        {
          ...route.params,
          primary_language: [UserReducer?.userData?.language?.id],
          translating_language: languageAndQty,
          occasion: selectedOccasion.id,
          note_to_translator: noteToTranslator,
        },
        accessToken,
        openConfirmBookModal,
      );
    } else {
      setShowIncompleteFormAlert(true);
    }
    setIsLoading(false);
   
  };

  const _onPressAddInterpreter = () => {
    const oldArray = [...selectedLanguages];
    if (selectedLanguages?.length <= LIMIT - 1) {
      setSelectedLanguages([
        ...oldArray,
        {
          id: Math.floor(Math.random() * 1000),
          primaryLang: UserReducer?.userData?.language,
          translationLang: languages[0],
        },
      ]);
    } else {
      return;
    }
  };

  const _onPressBin = item => {
    if (selectedLanguages?.length > 1 && selectedLanguages?.length <= LIMIT) {
      const index = selectedLanguages.findIndex(x => x.id === item.id);
      const oldArray = [...selectedLanguages];
      oldArray.splice(index, 1);
      setSelectedLanguages(oldArray);
    } else {
      return;
    }
  };


  useEffect(() => {
    getAllLanguages();
  }, []);


   useEffect(() => {
    if (UserReducer?.errorModal?.status === true) {
      setShowErrorModal(true);
    }
    if (UserReducer?.errorModal?.status === false) {
      setShowErrorModal(false);
    }
  }, [UserReducer?.errorModal]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        {/* <AppStatusBar
          backgroundColor={colors.themePurple1}
          barStyle="light-content"
        /> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Langugae Dropdown  */}

          {selectedLanguages?.map((ele, index) => (
            <TouchableOpacity
              key={index}
              style={styles.languageInfoView}
              activeOpacity={0.7}
              onPress={() => {
                setSelectedOption(ele);
                setShowLanguagesDropdown(true);
              }}>
              <View style={styles.rowView}>
                <IconComp
                  type="FontAwesome"
                  name="language"
                  iconStyle={styles.menuStyle}
                />
                <Heading
                  title={
                    ele?.translationLang?.language_name
                      ? ele?.translationLang?.language_name
                      : 'Language'
                  }
                  passedStyle={styles.langInfoText}
                />
              </View>
              <IconComp
                type="AntDesign"
                name="caretdown"
                iconStyle={styles.caretdown}
              />
            </TouchableOpacity>
          ))}

          {/* Selected Languages Translation  */}
          {selectedLanguages?.map((ele, index) => (
            <View style={styles.transaltionView} key={index}>
             
              <Heading
                title={ele?.primaryLang?.language_name}
                passedStyle={styles.translationLanguage}
              />
              <IconComp
                type="AntDesign"
                name="caretright"
                iconStyle={styles.caretRightLanguage}
              />
              <Heading
                title={ele?.translationLang?.language_name}
                passedStyle={styles.translationLanguage}
              />
              {selectedLanguages?.length > 1 &&
                selectedLanguages?.length <= LIMIT && (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => _onPressBin(ele)}>
                    <IconComp
                      type="Feather"
                      name="trash-2"
                      iconStyle={styles.bin}
                    />
                  </TouchableOpacity>
                )}
            </View>
          ))}

          {selectedLanguages?.length <= LIMIT - 1 && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                _onPressAddInterpreter();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: height * 0.01,
              }}>
              <IconComp
                type="Ionicons"
                name="md-add-circle-sharp"
                iconStyle={{color: colors.themePurple1, fontSize: width * 0.1}}
              />
              <Heading
                title="Add Interpreter"
                passedStyle={styles.addInterpreter}
              />
            </TouchableOpacity>
          )}

          {/* Occasions Button  */}
          <TouchableOpacity
            style={styles.btnStyle}
            activeOpacity={0.8}
            onPress={() => setShowOccasionsDropdown(true)}>
            {/* // onPress={() => navigation.navigate('Booking')}> */}
            <Heading
              title={selectedOccasion ? selectedOccasion.name : 'Occasions'}
              fontType="medium"
              passedStyle={styles.btnTextStyle}
            />
            <IconComp
              type="AntDesign"
              name="caretright"
              iconStyle={styles.caretRight}
            />
          </TouchableOpacity>

          {/* Note to translator Button  */}
          <TouchableOpacity
            style={styles.btnStyle}
            activeOpacity={0.8}
            onPress={() => setShowNoteToTranslatorModal(true)}>
            <Heading
              title={'Note to translator'}
              fontType="medium"
              passedStyle={styles.btnTextStyle}
            />
            <IconComp
              type="AntDesign"
              name="caretright"
              iconStyle={styles.caretRight}
            />
          </TouchableOpacity>

          {/* <TouchableOpacity
          style={styles.approxBox}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ConfirmModal', dummyTranslator)}
         
        >
          <Heading
            title="$800.00 approx."
            passedStyle={styles.approxLabel}
            fontType="bold"
          />
          <Heading title="Total time LIMIT Hours" passedStyle={styles.totalHours} />
        </TouchableOpacity> */}

          {isLoading ? (
            <View style={styles.loadingComponent} activeOpacity={1}>
              <Heading
                title="Hiring..."
                passedStyle={styles.savingText}
                fontType="semi-bold"
              />
              <LottieView
                speed={1}
                style={styles.lottieStyles}
                autoPlay
                loop
                source={require('../assets/Lottie/purple-loading-2.json')}
              />
            </View>
          ) : (
            <Button
              title="Hire Now"
              onBtnPress={() => _onNextPress()}
              btnStyle={styles.nextBtnStyle}
              isBgColor={false}
              btnTextStyle={{fontFamily: 'Poppins-SemiBold', color: 'white'}}
            />
          )}
        </ScrollView>

        {/* Langugaes Dropdown Modal  */}
        {showLanguagesDropdown && (
          <CustomDropdownModal
            array={languages}
            onPress={_onLanguageSelectionPress}
            isModalVisible={showLanguagesDropdown}
            setIsModalVisible={setShowLanguagesDropdown}
          />
        )}

        {/*Ocassions Dropdown Modal  */}
        {showOccasionsDropdown && (
          <CustomDropdownModal
            array={occasions}
            onPress={_onOccasionsSelectionPress}
            isModalVisible={showOccasionsDropdown}
            setIsModalVisible={setShowOccasionsDropdown}
          />
        )}

        {/* Message To Translator Modal  */}
        {showNoteToTranslatorModal && (
          <NoteToTranslatorModal
            value={noteToTranslator}
            setValue={setNoteToTranslator}
            isModalVisible={showNoteToTranslatorModal}
            setIsModalVisible={setShowNoteToTranslatorModal}
          />
        )}

        {showIncompleteFormAlert && (
          <AlertModal
            title="Oh Snaps :("
            message={'Some fields have been left empty.'}
            isModalVisible={showIncompleteFormAlert}
            setIsModalVisible={setShowIncompleteFormAlert}
          />
        )}
        {/* {showErrorModal && (
          <AlertModal
            title="Submission Error :("
            message={`Something went wrong.`}
            isModalVisible={showErrorModal}
            setIsModalVisible={setShowErrorModal}
          />
        )} */}

         {showErrorModal && (
            <AlertModal
              title="Oh Snaps!"
              isModalVisible={showErrorModal}
              setIsModalVisible={setShowErrorModal}
              message={UserReducer?.errorModal?.msg}
              onPress={() => {
                setErrorModal();
                setShowErrorModal(false);
              }}
            />
          )}
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(LanguageSelection);

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
    width: width * 0.8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    height: height * 0.085,
  },
  languageInfoView: {
    // marginTop: height * 0.05,
    marginVertical: height * 0.01,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width * 0.8,
    alignSelf: 'center',
    borderRadius: width * 0.04,
    borderWidth: 1.2,
    height: height * 0.084,
    borderColor: colors.themePurple1,
    position: 'relative',
  },
  transaltionView: {
    marginVertical: height * 0.02,
    width: width * 0.75,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  translationLanguage: {
    fontSize: width * 0.045,
    textTransform: 'capitalize',
    color: 'black',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuStyle: {
    color: '#5d5d5d',
    fontSize: width * 0.04,
    paddingHorizontal: width * 0.05,
  },
  addInterpreter: {
    color: colors.themePurple1,
    fontSize: width * 0.045,
    marginLeft: width * 0.02,
    marginTop: height * 0.001,
  },
  caretdown: {
    color: '#5d5d5d',
    fontSize: width * 0.03,
    position: 'absolute',
    bottom: height * 0.03,
    right: width * 0.045,
  },
  caretRight: {
    color: colors.themePurple1,
    fontSize: width * 0.03,
    position: 'absolute',
    bottom: height * 0.04,
    right: width * 0.045,
  },
  caretRightLanguage: {
    color: colors.themePurple1,
    fontSize: width * 0.03,
  },
  bin: {
    color: colors.themePurple1,
    fontSize: width * 0.06,
  },
  langInfoText: {
    color: '#5d5d5d',
    fontSize: width * 0.04,
  },
  btnStyle: {
    borderRadius: width * 0.04,
    alignSelf: 'center',
    width: width * 0.8,
    backgroundColor: colors.themeLightPurple,
    paddingVertical: height * 0.03,
    marginVertical: height * 0.01,
  },
  btnTextStyle: {
    fontSize: width * 0.043,
    color: colors.themePurple1,
    textAlign: 'center',
  },
  nextBtnStyle: {
    marginTop: height * 0.03,
    backgroundColor: colors.themePurple1,
    borderRadius: width * 0.07,
    width: width * 0.75,
  },
  approxBox: {
    marginVertical: height * 0.025,
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: width * 0.8,
    borderRadius: width * 0.09,
    borderWidth: 1.2,
    borderColor: colors.themePurple1,
    position: 'relative',
  },
  approxLabel: {
    fontSize: width * 0.07,
    color: colors.themePurple1,
  },
  totalHours: {
    fontWeight: '400',
    fontSize: width * 0.043,
    color: 'black',
  },

  lottieStyles: {
    // height: height * 0.15,
    position: 'absolute',
    left: width * 0.08,
    right: 0,
    // top: height * -0.001,
  },
  loadingComponent: {
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.themePurple1,
    alignSelf: 'center',
    height: height * 0.08,
    marginTop: height * 0.03,
    backgroundColor: colors.themePurple1,
    borderRadius: width * 0.07,
    width: width * 0.75,
  },
  savingText: {
    color: 'white',
    position: 'absolute',
    left: width * 0.22,
    top: height * 0.022,
    fontSize: width * 0.045,
  },
});

const dummyTranslator = {
  _id: 1,
  name: 'michael reimer',
  type: 'translator',
  native: 'english',
  phone: '0800 1234 567',
};
