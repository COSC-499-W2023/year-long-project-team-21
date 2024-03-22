import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const tabBarStyles = StyleSheet.create({
  containerTop: {
    flex: 0.075,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: global.tertiary,
    paddingBottom: 5,
  },
  containerBottom: {
    flex: 0.075,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: global.tertiary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  leftBottom: {
    flex: 1 / 3,
    paddingTop: '5%',
    alignItems: 'center',
  },
  middleBottom: {
    flex: 1 / 3,
    paddingTop: '2%',
    alignItems: 'center',
  },
  rightBottom: {
    paddingTop: '4%',
    alignItems: 'center',
    flex: 1 / 3,
  },
  leftTop: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  middleTop: {
    flex: 1 / 3,
    paddingTop: '3%',
    alignItems: 'center',
  },
  rightTop: {
    paddingTop: '4%',
    alignItems: 'center',
    flex: 1 / 3,
  },
});
export default tabBarStyles;
