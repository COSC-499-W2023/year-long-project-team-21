import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const splashscreen = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 20,
    color: '#FFFFFF',
  },
  errorText: {
    marginTop: 20,
    fontSize: 20,
    color: 'red', // Example error text color
  },
});

export default splashscreen;
