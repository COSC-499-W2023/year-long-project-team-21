import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const profileStyles = StyleSheet.create({
  userInformation: {
    marginTop: '8%',
    // backgroundColor:"red"
  },
  userinfocontainer: {
    margin: '5%',
    backgroundColor: global.tertiary,
    borderRadius: 20,
    // flexDirection:"column",
    // justifyContent: "space-between"
  },
  ratingContainer: {
    paddingTop: '4%',
    // backgroundColor:"white"
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
  title: {
    fontSize: 25,
    color: global.secondary,
  },
  button_container: {
    // paddingTop: "4%",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // backgroundColor:"yellow"
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
  modalContainer: {
    // backgroundColor:"white",
    // height: "50%",
    // width: "80%",
    alignSelf: 'center',
    // flexDirection:"column",
    // justifyContent:"space-evenly"
  },
  modalButtonContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    // backgroundColor:"yellow",
  },
  modalTitle: {
    paddingTop: '4%',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    // backgroundColor:"blue",
    alignContent: 'center',
  },
});

export default profileStyles;
