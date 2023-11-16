import { StyleSheet } from 'react-native';
import { global } from './global';

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  greyText: {
    color: global.primary,
    fontSize: 30,
    fontWeight: 'bold',
  },
  yellowText: {
    color: global.secondary,
    fontSize: 30,
    fontWeight: '300',
  },
});

export default styles;
