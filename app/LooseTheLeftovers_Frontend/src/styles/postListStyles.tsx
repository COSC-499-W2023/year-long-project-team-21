import { StyleSheet } from 'react-native';

const generatePostListStyles = (screenWidth: number) =>StyleSheet.create({
  postContainer: {
    marginBottom: 20,
  },
  headerContainer:{
    zIndex:9999, 
    elevation:10,
  },
  listHeder: {
    backgroundColor:'white',
  },
  titleHeader: {
    alignSelf: 'center',
    marginTop: 20,
  },
  dropdownHeader: {
    marginVertical:20,
    left: 0.07*screenWidth,    
  }
});

export default generatePostListStyles;