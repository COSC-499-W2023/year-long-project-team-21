import { StyleSheet } from "react-native";
import { global } from "../common/global_styles";

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: global.background,
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
        borderColor: global.primary,
        borderWidth: 1,
    },
    buttonText: {
        color: global.secondary,
        textAlign: 'center',
    },
    image: {
        marginTop: 10,
        width: 100, // Set the width
        height: 100, // Set the height
        borderRadius: 10, // Optional, rounded corners
    },
});

export default styles;
