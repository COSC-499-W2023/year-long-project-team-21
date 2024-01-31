import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const styles = StyleSheet.create({
  RegistrationContainer: {
    flex: 1,
    backgroundColor: global.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: { marginBottom: '-5%' },
  container: {
    flex: 0.3,
    paddingHorizontal: 20,
    justifyContent: 'center', // Center items along the main axis within the form
    alignItems: 'center', // Stretch items to fill the cross-axis within the form
  },
  button: {
    alignItems: 'center',
    marginBottom: '10%',
  },

  input: {
    flex: 0.5,
    paddingVertical: 1,
    color: global.secondary,
  },
  icon: {
    padding: 10,
  },
  hiddenText: {
    alignItems: 'center',
  },
  login: {
    marginBottom: '20%',
    // textAlign: 'center',
    justifyContent: 'center',
  },
});

export default styles;
