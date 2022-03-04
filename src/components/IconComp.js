import React from 'react';
import {Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const IconComp = ({name, type, iconStyle}) => {
  switch (type) {
    case 'MaterialIcons':
      return (
        <MaterialIcons name={name} size={20} color={'#fff'} style={iconStyle} />
      );

    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIcons
          name={name}
          size={20}
          color={'#fff'}
          style={iconStyle}
        />
      );

    case 'Octicons':
      return (
        <Octicons name={name} size={20} color={'#fff'} style={iconStyle} />
      );

      case 'Foundation':
        return (
          <Foundation name={name} size={20} color={'#fff'} style={iconStyle} />
        );
    case 'Ionicons':
      return (
        <Ionicons name={name} size={20} color={'#fff'} style={iconStyle} />
      );

    case 'Fontisto':
      return (
        <Fontisto name={name} size={20} color={'#fff'} style={iconStyle} />
      );
    case 'AntDesign':
      return (
        <AntDesign name={name} size={20} color={'#fff'} style={iconStyle} />
      );

    case 'EvilIcons':
      return (
        <EvilIcons name={name} size={20} color={'#fff'} style={iconStyle} />
      );

    case 'Entypo':
      return <Entypo name={name} size={20} color={'#fff'} style={iconStyle} />;

    case 'FontAwesome5':
      return (
        <FontAwesome5 name={name} size={20} color={'#fff'} style={iconStyle} />
      );

    case 'Feather':
      return <Feather name={name} size={20} color={'#fff'} style={iconStyle} />;

    case 'FontAwesome':
      return (
        <FontAwesome name={name} size={20} color={'#fff'} style={iconStyle} />
      );
    default:
      return null;
      break;
  }
};

export default IconComp;
