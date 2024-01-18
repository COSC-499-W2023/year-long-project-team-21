import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import generateSelectRangeBarStyles from '../styles/SelectRangeBarStyles';
import { SelectRangeBarProps } from '../common/Types';

const SelectRangeBar: React.FC<SelectRangeBarProps> = ({ onSelectRange }) => {
    const screenWidth = Dimensions.get('window').width;

  const [item, setSelectedItem] = useState([
    { label: 'All location', value: -1},
    { label: '1 km', value: 1 },
    { label: '5 km', value: 5 },
    { label: '10 km', value: 10 },
    { label: '20 km', value: 20 },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const styles = generateSelectRangeBarStyles(screenWidth);
  return (
    <DropDownPicker
      placeholder='Select Radius'
      open={open}
      value={value}
      items={item}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setSelectedItem}
      style ={styles.picker}
      textStyle={styles.text}
      dropDownContainerStyle={styles.dropDown}
      itemSeparator = {true}
      itemSeparatorStyle={styles.separater}
      />
  );
};

export default SelectRangeBar;
