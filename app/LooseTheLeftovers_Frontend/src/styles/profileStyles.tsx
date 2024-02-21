import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const profileStyles = StyleSheet.create({
  userInformation: {
    top: '8%',
    // backgroundColor: global.tertiary,
    borderRadius: 20,
    flex: 1,
  },
  userinfocontainer: {
    // marginBottom: '4%',
    // marginLeft: '5%',
    // marginRight: '5%',
    // marginTop: "4%",
    margin:"5%",
    backgroundColor: global.tertiary,
    borderRadius: 20,
    flexDirection:"column",
    // flex: 0.5,
    justifyContent: 'flex-start',
  },
  profileText: {
    // top: '10%',
    // flex: 0.25,
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
  button_container: {
    paddingTop: "4%",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    // paddingTop: '4%',
    // flexDirection: 'column',
    // alignItems: 'center',
  },
  viewPost: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

export default profileStyles;
