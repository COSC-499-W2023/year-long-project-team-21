import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: global.background,
    },
    tabcontainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: 15,
        paddingTop: 15,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
    },
});

export default styles;