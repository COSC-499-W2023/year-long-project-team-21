import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    backgroundColor: global.background,
    padding: '10%',
  },

  title: {
    flex: 0.4,
  },
  instruction: {
    borderRadius: 30,
    backgroundColor: global.tertiary,
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1.25,
    padding: '8%',
  },
  textimage: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.3,
    justifyContent: 'center',
  },
  text: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    color: 'white',
    fontSize: 17,
  },
  textColor: { color: global.primary },
  button: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  margin: {
    // marginBottom: '5%',
  },
});

export default style;
