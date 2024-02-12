import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const styles = StyleSheet.create({
  chatItem: {
    backgroundColor: global.background,
    padding: 15,
    borderWidth: 1,
    borderColor: global.tertiary,
    borderRadius: 15,
  },
  chatItemName: {
    color: global.secondary,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  chatItemMessage: {
    color: global.secondary,
    fontSize: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: global.primary,
    textAlign: 'center',
  },
});

export default styles;
