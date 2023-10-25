import React from 'react'
import { View, StyleSheet, Text, Image} from 'react-native'
interface HeaderProps{
   
    image: string;
}

const Header: React.FC<HeaderProps> = ({ image}) => {
    return (
        <View style = {styles.header}>
            <Image source = {{uri: image}} style = {styles.headerImage}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        padding: 10,
        justifyContent:'center'
    },
    headerImage:{
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent:'center'
    },
    headerText:{
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default Header