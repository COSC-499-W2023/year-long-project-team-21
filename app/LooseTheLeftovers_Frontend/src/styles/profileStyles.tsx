import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const profileStyles = StyleSheet.create({
  userInformation: {
    top: '10%',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
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
});

export default profileStyles;
