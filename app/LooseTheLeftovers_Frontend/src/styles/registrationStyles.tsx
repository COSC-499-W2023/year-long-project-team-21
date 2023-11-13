import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  RegistrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
  },
  logo :{
    marginBottom: 10
  },
  container: {
    flex:1,
    paddingHorizontal: 20,
    justifyContent: 'center', // Center items along the main axis within the form
    alignItems: 'center', // Stretch items to fill the cross-axis within the form
  },
  button: {
    marginBottom: 150,
    alignItems: 'center',
  },
  passwordContainer: {
    borderColor: 'gray',
    height: 40,
    width: 250,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, // Adjust the marginTop to add more space
    marginHorizontal: 60,
    borderWidth: 1,
    borderRadius:5
  },  
  input: {
    flex: 1,
    paddingVertical:1,
  },
  icon: {
    padding:10,
  },
  hiddenText: {
    alignItems: 'center',
  }
});

export default styles;
