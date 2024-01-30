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
    alignSelf: 'flex-start', // Align ImagePicker to the left
    paddingTop: 15,
  },
  expirySliderContainer: {
    paddingTop: 15,
  },
  buttonContainer: {
    alignItems: 'center', // Center align Submit button
    paddingVertical: 15,
  },
  doneButton: {
    width: '50%',
    alignSelf: 'center',
  },
  leftAlignedText: {
    alignSelf: 'flex-start',
    paddingTop: 15,
  },
  errorMessage: {
    paddingTop: 25,
  }
});

export default styles;
