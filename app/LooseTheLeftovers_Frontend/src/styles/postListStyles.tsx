import { StyleSheet } from 'react-native';
import {global} from '../common/global_styles'
const generatePostListStyles = (screenWidth: number) =>
  StyleSheet.create({
    postContainer: {
      marginBottom: screenWidth * 0.05,
    },
    listHeder: {
    },
    titleContainer: {
      alignSelf: 'center',
      marginTop: screenWidth * 0.07,
    },
    title: {
      color: global.dropdown_color.dark_text
    },
    dropdownHeader: {
      marginVertical: 20,
      left: 0.07 * screenWidth,
    },
  });

export default generatePostListStyles;
