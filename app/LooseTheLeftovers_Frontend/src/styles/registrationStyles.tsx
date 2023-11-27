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
  logo: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center', // Center items along the main axis within the form
    alignItems: 'center', // Stretch items to fill the cross-axis within the form
  },
  button: {
    marginBottom: 150,
    alignItems: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: global.primary,
    borderRadius: 8,
    width: 280,
    marginVertical: 10,
    color: global.primary,
  },
  input: {
    flex: 1,
    paddingVertical: 1,
    color: global.secondary,
    padding: 10,
  },
  icon: {
    padding: 10,
  },
  hiddenText: {
    alignItems: 'center',
  },
});

export default styles;
