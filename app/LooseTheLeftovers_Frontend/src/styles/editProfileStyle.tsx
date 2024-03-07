import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingVertical: '5%',
  },
  titleContainer: {
    paddingTop: '5%',
    fontSize: 30,
    color: 'white',
  },
  inputFieledContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: '90%',
  },
  inputFieldTitleContainer: {
    color: 'white',
    paddingTop: '5%',
  },
  wiggleClicks: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftClick: {
    alignSelf: 'center',
    paddingVertical: "1%",
    marginVertical: "5%",
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  rightClick: {
    alignSelf: 'center',
    paddingVertical: "1%",
    marginVertical: "6.5%", //zero idea how this makes the right click to the same lavel as the left
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
});

export default styles;
