import { StyleSheet } from 'react-native';

const generateSelectRangeBarStyles = (screenWidth:number) => StyleSheet.create({
  container: {
    marginLeft: 0.01 * screenWidth, 
    backgroundColor:'red',
    width:screenWidth/2,
  },
  picker: {
    borderWidth:2,
    borderColor:'green', 
    borderRadius: 0.1 * screenWidth,
    backgroundColor:'black',
    minHeight:0.05 * screenWidth
  },
  text: {
    fontSize:15, 
    fontWeight:'500',
    textAlign:'center',
  },
  dropDown: {
    borderColor:'green', 
    width:screenWidth/2,
    borderRadius: 0.1 * screenWidth, 
    borderWidth: 1,    
  },
  separater: {
    borderWidth: 2,
  }
});

export default generateSelectRangeBarStyles;