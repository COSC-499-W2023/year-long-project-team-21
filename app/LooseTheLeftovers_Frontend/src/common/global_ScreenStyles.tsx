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
      flex: 14,
  },
});

export default globalscreenstyles;
