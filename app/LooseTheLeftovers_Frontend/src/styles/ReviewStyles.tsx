import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const ReviewStyles = StyleSheet.create({
  Title: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    fontWeight: '700',
    fontSize: 45,
    color: global.secondary,
    marginLeft: '10%',
    marginRight: '10%',
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  Rating: {
    flex: 0.25,
    justifyContent: 'center',
  },
  Button: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ReviewStyles;
