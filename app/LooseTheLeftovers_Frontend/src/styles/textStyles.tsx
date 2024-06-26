import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 18,
    fontWeight: 'bold',
    color: global.primary,
  },
  TitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TitleText: {},
});

export default styles;
