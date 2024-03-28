import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const profileStyles = StyleSheet.create({
  userInformation: {
    marginTop: '8%',
  },
  userinfocontainer: {
    margin: '5%',
    backgroundColor: global.tertiary,
    borderRadius: 20,
  },
  ratingContainer: {
    paddingTop: '4%',
  },
  profileText: {
    textAlign: 'center',
    color: global.secondary,
    fontSize: 23,
  },
  item: {
    alignItems: 'center',
    marginVertical: '4%',
    marginHorizontal: '4%',
  },
  profilePicture: {
    marginTop: '5%',
    marginBottom: '-5%',
    alignSelf: 'center',
    width: 52,
    height: 50,
  },
  title: {
    fontSize: 25,
    color: global.secondary,
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  viewPost: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

export default profileStyles;
