import React, { memo, useState } from 'react';
import { Dimensions, View } from 'react-native';
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
 * @component
 *
 * @param {Object} props - The properties passed to the component.
 * @param {function} props.onSelectRange - Callback function to handle the selected geographical radius.
 *
 * @returns {JSX.Element} The SelectRangeBar component.
 */
const SelectRangeBar: React.FC<SelectRangeBarProps> = ({ onSelectRange }) => {
  const screenWidth = Dimensions.get('window').width;
  /**
   * SelectRangeBar State
   * @type {Object}
   * @property {Array<Object>} item - Array of objects representing predefined distance options.
   * @property {boolean} open - Boolean indicating whether the dropdown picker is open.
   * @property {number} value - The selected value from the dropdown picker.
   */
  const [item, setSelectedItem] = useState([
    { label: 'All location', value: '-1', testID: 'dropdown-item-all' },
    { label: '1 km', value: '1', testID: 'dropdown-item-1' },
    { label: '5 km', value: '5', testID: 'dropdown-item-5' },
    { label: '10 km', value: '10', testID: 'dropdown-item-10' },
    { label: '20 km', value: '20', testID: 'dropdown-item-20' },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const styles = generateSelectRangeBarStyles(screenWidth);

  /**
   * Handles changes in the dropdown picker's state.
   *
   * @function
   * @private
   * @param {number | null} newValue - The newly selected value from the dropdown picker.
   * @returns {void}
   */
  const handleDropDownChange = (newValue: string | null) => {
    try {
      if (typeof newValue === 'string') {
        // Ensure that newValue is a valid number or null before setting the state
        setValue(newValue);
        onSelectRange && onSelectRange(newValue);
      }
    } catch (error) {
      console.error('Error handling dropdown change:', error);
    }
  };

  return (
    <DropDownPicker
      testID="select-radius-dropdown"
      placeholder={value !=='' ? value : "Select Radius"}      open={open}
      value={value}
      items={item}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setSelectedItem}
      style={{
        ...styles.picker,
        marginBottom: open ? 200 : 0,
      }}
      textStyle={styles.text}
      dropDownContainerStyle={styles.dropDown}
      itemSeparator={true}
      itemSeparatorStyle={styles.separater}
      onChangeValue={handleDropDownChange}
    />
  );
};

export default memo(SelectRangeBar);
