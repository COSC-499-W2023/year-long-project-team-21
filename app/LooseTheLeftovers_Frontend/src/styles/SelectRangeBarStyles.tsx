import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const generateSelectRangeBarStyles = (screenWidth: number) =>
  StyleSheet.create({
    picker: {
      width: screenWidth / 2,
      borderColor: global.dropdown_color.medium_border,
      borderRadius: 0.06 * screenWidth,
      backgroundColor: global.primary,
      elevation: 5,
    },
    text: {
      fontSize: 18,
      fontWeight: '500',
      textAlign: 'center',
      color: global.secondary,
    },
    dropDown: {
      borderColor: global.primary,
      width: screenWidth / 2,
      borderRadius: 0.06 * screenWidth,
      borderWidth: 2,
      textAlign: 'center',
      elevation: 5,
      backgroundColor: global.tertiary,
    },
    separater: {
      backgroundColor: 'white',
    },
  });

export default generateSelectRangeBarStyles;
