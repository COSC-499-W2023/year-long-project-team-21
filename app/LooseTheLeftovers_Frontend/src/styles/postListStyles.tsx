import { StyleSheet } from 'react-native';

const generatePostListStyles = (screenWidth: number) =>StyleSheet.create({
  postContainer: {
    marginBottom: screenWidth*0.05,
  },
  listHeder: {
    backgroundColor:'white',
  },
  titleHeader: {
    alignSelf: 'center',
    marginTop: screenWidth*0.07,
  },
  dropdownHeader: {
    marginVertical:20,
    left: 0.07*screenWidth,
  }
});

export default generatePostListStyles;