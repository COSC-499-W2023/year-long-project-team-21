import { StyleSheet } from 'react-native';

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
  item: {
    alignItems: 'center',
    marginVertical: '4%',
    marginHorizontal: '4%',
  },
  title: {
    fontSize: 25,
  },
});

export default profileStyles;
