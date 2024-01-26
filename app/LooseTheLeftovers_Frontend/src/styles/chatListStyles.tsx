import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: global.background,
    },
    tabcontainer: {
      paddingTop: 15,
      paddingBottom: 15,
      borderTopColor: '#ccc',
      borderTopWidth: 1,
    },
    listcontainer: {
    },
    chatItem: {
      backgroundColor: global.background,
      padding: 15,
      borderWidth: 1,
      borderColor: '#555',
      borderRadius: 15,
    },
    chatItemName: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 5,
    },
    chatItemMessage: {
      color: '#fff',
      fontSize: 15,
    },
    emptyListContainer: {
    },
    emptyListText: {
    },
});

export default styles;