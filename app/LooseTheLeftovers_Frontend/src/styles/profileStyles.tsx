import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const profileStyles = StyleSheet.create({
  userInformation: {
    top: '3%',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: global.tertiary,
    flex: 0.3,
    borderRadius: 20,
  },
  profileText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
    alignContent: 'center',
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    marginVertical: '4%',
    marginHorizontal: '4%',
  },
  title: {
    fontSize: 25,
    color: global.secondary,
  },
});

export default profileStyles;
