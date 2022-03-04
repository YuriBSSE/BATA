import React from 'react';
import {
  StatusBar,
  Animated,
  Dimensions,
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDrawerStatus} from '@react-navigation/drawer';
import {CommonActions} from '@react-navigation/native';
import Svg, {Polygon} from 'react-native-svg';
import IconComp from './components/IconComp';
import colors from './assets/colors';
import * as actions from './store/actions/actions';
import {connect} from 'react-redux';
import Heading from './components/Heading';

const {width, height} = Dimensions.get('window');

const CustomButton = ({onPress, label, style, currentScreenName}) => {
  //   const thisRoute = useRoute();
  return (
    <TouchableOpacity
      // key={key}
      onPress={onPress}
      style={[
        styles.btnContainer,
        label?.routeName == currentScreenName && {
          backgroundColor: colors.themeLightPurple,
        },
      ]}>
      <IconComp
        name={label.iconName}
        type={label.iconType}
        iconStyle={[
          styles.btnIconStyle,
          label?.routeName == currentScreenName && {color: colors.themePurple1},
        ]}
      />
      <Heading
        passedStyle={[
          styles.btnText,
          label?.routeName == currentScreenName && {color: colors.themePurple1},
        ]}
        title={label.routeName}
      />
    </TouchableOpacity>
  );
};

const CustomDrawer = ({navigation, routes, user_logout, UserReducer}) => {
  const isDrawerOpen = useDrawerStatus() === 'open';
  const history = navigation.getState().history;
  const currentScreenName = isDrawerOpen
    ? history[history?.length - 2].key.split('-')[0]
    : history[history?.length - 1].key.split('-')[0];

  const bottomLinks = [
    {
      id: 10,
      iconName: 'logout',
      iconType: 'MaterialIcons',
      routeName: 'logout',
    },
  ];
  return (
    <View style={{flex: 1}}>
      <Image
        source={require('./assets/Images/Logo.png')}
        resizeMode="contain"
        style={styles.appLogo}
      />
      <View style={styles.menuContainer}>
        <View style={styles.menu}>
          <View>
            {routes.map((route, index) => {
              return (
                <CustomButton
                  label={route}
                  key={index}
                  onPress={() => {
                    // if (currentScreenName === route.routeName) {
                    //   // const resetAction = CommonActions.reset({
                    //   //   index: 1,
                    //   //   routes: [
                    //   //     {
                    //   //       // name: route.routeName,
                    //   //       name:'Home'
                    //   //       // params: {YOUR_OPTIONAL_DATA}
                    //   //     },
                    //   //   ],
                    //   // });
                    //   // navigation.dispatch(resetAction);
                    // } else {
                    //   navigation.navigate(route.routeName);

                    // }
                    navigation.navigate(route.routeName);
                  }}
                  currentScreenName={currentScreenName}
                  style={[styles.button]}
                />
              );
            })}
          </View>

          <View>
            {bottomLinks.map((link, index) => {
              return (
                <CustomButton
                  label={link}
                  key={index}
                  onPress={() => {
                    user_logout(UserReducer?.userData?.id);
                  }}
                  currentScreenName={currentScreenName}
                  style={[styles.buttonSmall]}
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(CustomDrawer);

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.05,
  },
  menu: {
    flex: 1,
    justifyContent: 'space-between',
  },
  appLogo: {
    width: width * 0.25,
    height: height * 0.15,
    marginTop: height * 0.06,
    marginLeft: width * 0.07,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.016,
  },
  btnIconStyle: {
    fontSize: width * 0.07,
    color: 'black',
    paddingHorizontal: width * 0.06,
  },
  btnText: {
    color: 'black',
    fontSize: width * 0.045,
    textTransform: 'capitalize',
  },
});
