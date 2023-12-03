import { StyleSheet } from "react-native";
import { global } from "../common/global_styles";

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: global.primary,
        textAlign: 'center',
    },
    iconContainer: {
        padding: 8, // Adjust padding
    },
    icon: {
    },
    placeholderIcon: {
        width: 48, // Width should match the Icon size plus padding
        height: 48, // Height should match the Icon size plus padding
    },
});

export default styles;
