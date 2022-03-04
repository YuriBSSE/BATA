import React from 'react';
import {StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({date, setDate}) => {
  //   Date Picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setDate(currentDate);
  };

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      is24Hour={true}
      display="default"
      onChange={onChange}
    />
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
