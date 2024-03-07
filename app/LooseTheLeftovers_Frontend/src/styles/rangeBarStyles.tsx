import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

export const styles = StyleSheet.create({
  boxStyles: {
    width: '60%',
    height: 50,
    borderColor: global.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
  },
  inputStyles: {
    color: global.secondary, // Text color inside the box
  },
  dropdownStyles: {
    borderColor: global.primary, // Border color for dropdown
    width: '60%',
    borderWidth: 1, // Border width for dropdown
    paddingVertical: 6,
    marginBottom: 10,
  },
  dropdownTextStyles: {
    color: global.secondary, // Text color for dropdown items
  },
});
