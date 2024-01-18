import React, { useState } from 'react';
import { Dimensions} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import generateSelectRangeBarStyles from '../styles/SelectRangeBarStyles';
import { SelectRangeBarProps } from '../common/Types';
/**
 * SelectRangeBar Component
 *
 * This component provides a dropdown picker for selecting a geographical radius. It utilizes
 * the DropDownPicker component from 'react-native-dropdown-picker' to present a list of predefined
 * distance options. The selected radius is communicated to the parent component through the
 * 'onSelectRange' prop, allowing for custom handling of the selected range.
 *
 * Components and Modules Used:
 * - React, useState: Core React and React hooks for managing state.
 * - Dimensions, View: React Native components for handling screen dimensions and view rendering.
 * - DropDownPicker: External component for creating dropdown pickers in React Native.
 * - generateSelectRangeBarStyles: Function for generating styles based on the device screen width.
 *
 * Props:
 * - onSelectRange: Callback function to handle the selected geographical radius.
 *
 * State:
 * - item: Array of objects representing predefined distance options.
 * - open: Boolean indicating whether the dropdown picker is open.
 * - value: The selected value from the dropdown picker.
 *
 * Methods:
 * - handleDropDownChange: Handles changes in the dropdown picker's state.
 *
 * @param {SelectRangeBarProps} props - The properties passed to the component.
 * @returns {JSX.Element} The SelectRangeBar component.
 */
const SelectRangeBar: React.FC<SelectRangeBarProps> = ({ onSelectRange }) => {
  const screenWidth = Dimensions.get('window').width;

  const [item, setSelectedItem] = useState([
    { label: 'All location', value: -1, testID: 'dropdown-item-all'},
    { label: '1 km', value: 1, testID: 'dropdown-item-1' },
    { label: '5 km', value: 5, testID: 'dropdown-item-5' },
    { label: '10 km', value: 10, testID: 'dropdown-item-10'},
    { label: '20 km', value: 20,testID: 'dropdown-item-20' },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(-1);
  const styles = generateSelectRangeBarStyles(screenWidth);

  /**
 * Handles changes in the dropdown picker's state.
 * Updates the selected value and communicates it to the parent component.
 *
 * @param {number | null} newValue - The newly selected value from the dropdown picker.
 */
const handleDropDownChange = (newValue: number|null) => {
  try{
    if(typeof newValue === 'number') {
    // Ensure that newValue is a valid number or null before setting the state
    setValue(newValue);
    onSelectRange && onSelectRange(newValue as number);
  }}catch(error){
    console.error('Error handling dropdown change:', error);
  }
};

  return (
    <DropDownPicker
      testID='select-radius-dropdown'
      placeholder="Select Radius"
      open={open}
      value={value}
      items={item}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setSelectedItem}
      style={styles.picker}
      textStyle={styles.text}
      dropDownContainerStyle={styles.dropDown}
      itemSeparator={true}
      itemSeparatorStyle={styles.separater}
      onChangeValue={handleDropDownChange}
    />
  );
};

export default SelectRangeBar;
