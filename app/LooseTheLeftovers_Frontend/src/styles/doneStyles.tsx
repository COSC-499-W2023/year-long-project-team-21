import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: global.background,
  },
  successText: {
    fontSize: 24,
    color: global.secondary,
    marginVertical: 20,
  },
  button: {
    backgroundColor: global.background,
    paddingTop: 80,
    borderRadius: 8,
    borderColor: global.primary,
  },
});

export default styles;
