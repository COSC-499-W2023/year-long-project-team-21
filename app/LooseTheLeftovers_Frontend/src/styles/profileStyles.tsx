import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const profileStyles = StyleSheet.create({
  userInformation: {
    top: '3%',
    backgroundColor: global.tertiary,
    flex: 0.3,
    borderRadius: 20,
  },
  profileText: {
    top: '10%',
    flex: 0.25,
    textAlign: 'center',
    color: global.secondary,
    fontSize: 25,
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
