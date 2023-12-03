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
    paddingTop: 15, // Add padding between the ImagePicker and other elements
  },
  expirySliderContainer: {
    paddingTop: 15, // Add padding between the ExpirySlider and other elements
  },
  buttonContainer: {
    alignItems: 'center', // Center align the Done button
    paddingVertical: 30, // Add padding above the Done button
  },
  doneButton: {
    width: '50%', // Make the Done button narrower
    alignSelf: 'center', // Ensure the button is centered
  },
  leftAlignedText: {
    alignSelf: 'flex-start',
    paddingTop: 15, // Add padding above the Done button
  },
});

export default styles;
