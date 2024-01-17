import { StyleSheet } from 'react-native';
import { global } from './global_styles';

const globalscreenstyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: global.background,
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 10,
  },
});

export default globalscreenstyles;
