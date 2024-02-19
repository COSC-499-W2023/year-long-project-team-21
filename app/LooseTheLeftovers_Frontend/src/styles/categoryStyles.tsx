import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const categoryStyles = StyleSheet.create({
  container: {
    padding: '2%',
    marginTop: '4%',
    marginRight: '4%',
    borderRadius: 10,
  },
  categoryWhole: {
    flex: 1,
    paddingLeft: '8%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
});

export default categoryStyles;
