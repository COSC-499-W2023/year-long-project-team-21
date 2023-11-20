import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const styles = StyleSheet.create({
  inputContainer: {
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
    color: global.secondary,
    padding: 10,
    width: 280 - 40, // Adjust for padding and icon width if secureTextEntry is true
  },
  inputWithToggle: {
    color: global.secondary,
    padding: 10,
    width: 280 - 40 - 30, // Subtract the width of the icon
  },
  icon: {
    color: global.primary,
    padding: 10,
  },
});

export default styles;
