import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const tabBarStyles = StyleSheet.create({
  containerTop: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: global.tertiary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  containerBottom: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: global.tertiary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  left: {
    flex: 1 / 3,
    paddingTop: '5%',
    alignItems: 'center',
  },
  middle: {
    flex: 1 / 3,
    paddingTop: '5%',
    //backgroundColor: 'blue',
    alignItems: 'center',
  },
  right: {
    paddingTop: '5%',
    //backgroundColor: 'green',
    alignItems: 'center',
    flex: 1 / 3,
  },
});
export default tabBarStyles;
