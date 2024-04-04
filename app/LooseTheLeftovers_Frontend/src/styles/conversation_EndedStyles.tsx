import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const Conversation_EndedStyles = StyleSheet.create({
  Title: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    fontWeight: '700',
    fontSize: 40,
    color: global.secondary,
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '10%',
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  Text: {},
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

export default Conversation_EndedStyles;
