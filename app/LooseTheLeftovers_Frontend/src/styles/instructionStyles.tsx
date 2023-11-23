import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
    alignItems: 'center',
    margin: '10%',
  },
  title: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 0.15,
  },
  instruction: {
    borderRadius: 10,
    borderColor: '#555455',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 0.8,
    borderWidth: 2,
    padding: '8%',
  },
  textimage: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.5,
    justifyContent: 'center',
    // backgroundColor: 'yellow',
  },
  text: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    //   backgroundColor: 'red',
  },
  image: {
    //  backgroundColor: 'green',
  },
  button: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default style;
