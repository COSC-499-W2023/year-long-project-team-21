import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    width: 280,
    marginVertical: 10,
  },
  input: {
    padding: 10,
    width: 280 - 40, // Adjust for padding and icon width if secureTextEntry is true
  },
  inputWithToggle: {
    padding: 10,
    width: 280 - 40 - 30, // Subtract the width of the icon
  },
  icon: {
    padding: 10,
  },
});

export default styles;
