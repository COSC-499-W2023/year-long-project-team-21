import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.background,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 0,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  imagePickerContainer: {
    alignSelf: 'flex-start',
    paddingTop: 15,
  },
  expirySliderContainer: {
    paddingTop: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  doneButton: {
    width: '50%',
    alignSelf: 'center',
  },
  leftAlignedText: {
    alignSelf: 'flex-start',
    paddingTop: 15,
  },
  networkError: {
    paddingTop: 20,
  },
  boxStyles: {
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
    borderWidth: 1, // Border width for dropdown
    paddingVertical: 6,
    marginBottom: 10,
  },
  dropdownTextStyles: {
    color: global.secondary, // Text color for dropdown items
  },
});

export default styles;
