import { StyleSheet } from 'react-native';
import { global } from './global_styles';

const globalscreenstyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: global.background,
  },
  middle: {
    flex: 0.85,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

export default globalscreenstyles;
