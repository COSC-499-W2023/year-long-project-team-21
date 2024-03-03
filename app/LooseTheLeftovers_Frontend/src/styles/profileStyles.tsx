import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const profileStyles = StyleSheet.create({
  userInformation: {
    top: '8%',
    backgroundColor: global.tertiary,
    borderRadius: 20,
    flex: 1,
  },
  userinfocontainer: {
    marginBottom: '4%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: global.tertiary,
    borderRadius: 20,
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  profileText: {
    top: '10%',
    flex: 0.25,
    textAlign: 'center',
    color: global.secondary,
    fontSize: 23,
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
  button: {
    paddingTop: '1%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },

  viewPost: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

export default profileStyles;
