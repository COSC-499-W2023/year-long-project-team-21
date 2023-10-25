import React from 'react'
import { View, StyleSheet, Text, Image} from 'react-native'
interface TitleProps{
    title: string;
}

const Title: React.FC<TitleProps> = ({title}) => {
    return (
        <View style = {styles.TitleContainer}>
            <Text style = {styles.TitleText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    TitleContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    TitleText:{
        fontSize: 25,
    }
})

export default Title