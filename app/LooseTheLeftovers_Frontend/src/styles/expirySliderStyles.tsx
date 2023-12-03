import { StyleSheet } from "react-native";
import { global } from "../common/global_styles";

const styles = StyleSheet.create({
    slider: {
        width: '100%', // Take full width of the content container
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%', // Match the width of the slider
        marginTop: 10, // Add space between the slider and the labels
    },
    sliderLabel: {
        color: global.primary,
    },
});

export default styles;
