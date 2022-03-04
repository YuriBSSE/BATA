import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const DropdownComp = ({selectedValue, setSelectedValue, data}) => {
  return (
    <View style={styles.dropdown}>
      <Picker
        mode="dropdown"
        dropdownIconColor='#fff'
        style={{color:'#fff'}}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        {data.map((item, i) => {
          return <Picker.Item  key={i} label={item.label} value={item.value} />;
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 15,
    width: width * 0.8,
    margin: height * 0.025,
    height: height * 0.08,
  },
});

export default DropdownComp;
