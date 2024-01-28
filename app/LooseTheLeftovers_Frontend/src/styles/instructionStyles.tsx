import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: global.background,
    padding: '10%',
  },

  title: {
    flex: 0.2,
  },
  instruction: {
    borderRadius: 10,
    borderColor: global.secondary,
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 0.8,
    borderWidth: 2,
    padding: '8%',
  },
  textimage: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.3,
    justifyContent: 'center',
  },
  text: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  textColor: { color: global.primary },
  button: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default style;
