import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const generateSelectRangeBarStyles = (screenWidth: number) =>
  StyleSheet.create({
    picker: {
      width: screenWidth / 2,
      borderWidth: 2,
      borderColor: global.dropdown_color.light_border,
      borderRadius: 0.1 * screenWidth,
      //minHeight:0.05 * screenWidth,
      backgroundColor: global.dropdown_color.background,
      elevation: 5,
    },
    text: {
      fontSize: 15,
      fontWeight: '500',
      textAlign: 'center',
    },
    dropDown: {
      borderColor: global.dropdown_color.light_border,
      width: screenWidth / 2,
      borderRadius: 0.1 * screenWidth,
      borderWidth: 2,
      textAlign: 'center',
      elevation: 5,
      backgroundColor: global.dropdown_color.background,
    },
    separater: {
      backgroundColor: 'black',
    },
  });

export default generateSelectRangeBarStyles;
