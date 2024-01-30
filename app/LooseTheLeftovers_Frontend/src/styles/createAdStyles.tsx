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
    paddingBottom: 0,
  }
});

export default styles;
