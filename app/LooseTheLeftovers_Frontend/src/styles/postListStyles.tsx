import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';
const generatePostListStyles = (screenWidth: number) =>
  StyleSheet.create({
    postContainer: {
      marginBottom: screenWidth * 0.05,
    },
    listHeder: {},

    titleContainer: {
      alignSelf: 'flex-start',
      paddingLeft: '8%',
      paddingBottom: '5%',
    },
    title: {
      color: global.secondary,
    },
    dropdownHeader: {
      marginVertical: 20,
      left: 0.07 * screenWidth,
    },
    loader: {
      marginTop: 10,
      alignContent: 'center',
      color: 'red',
    },
    footer: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 5,
      color: global.secondary,
    },
    editIconContainer: {
      width:"100%",
      top: "30.5%",
      position: 'absolute',
      alignItems: 'flex-end',
      right:"4%"
    }
  });

export default generatePostListStyles;
