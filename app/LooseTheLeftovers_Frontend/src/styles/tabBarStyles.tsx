import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const tabBarStyles = StyleSheet.create({
  container: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: global.background,
  },
  left: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  middle: {
    alignItems: 'center',
    flex: 1 / 3,
  },
  right: {
    alignItems: 'center',
    flex: 1 / 3,
  },
});
export default tabBarStyles;
