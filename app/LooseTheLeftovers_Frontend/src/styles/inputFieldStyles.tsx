import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: global.tertiary,
    height: 50,
    borderRadius: 15,
    width: '100%',
    marginVertical: 10,
  },
  input: {
    color: global.secondary,
    padding: 10,
    flex: 1,
  },
  inputWithToggle: {
    color: global.secondary,
    padding: 10,
    flex: 1,
  },
  icon: {
    color: global.primary,
    padding: 10,
  },
});

export default styles;
