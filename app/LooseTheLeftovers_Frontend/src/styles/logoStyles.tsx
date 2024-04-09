import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  primary: {
    color: global.primary,
    fontSize: 30,
    fontWeight: 'bold',
  },
  secondary: {
    color: global.secondary,
    fontSize: 30,
    fontWeight: '300',
  },
});

export default styles;
