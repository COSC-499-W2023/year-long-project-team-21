import React from 'react';
import { type PostProps } from '../common/Types';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Dimensions, View } from 'react-native';
import CardContent from 'react-native-paper/lib/typescript/components/Card/CardContent';
import tinycolor from 'tinycolor2';

const Post : React.FC<PostProps> = ({}) => {

    const screenWidth = Dimensions.get('window').width;
    const getCardColors = (color:string) => {
        const mainColor = tinycolor(color);

        // Original Color
        const originalColor = mainColor.toString();

        // Darker Shade
        const middleColor = mainColor.lighten(20).toString();

        // Lighter Shade
        const lightColor = mainColor.lighten(45).toString();      
      
        return { lightColor, originalColor, middleColor };
    };

    const colors = getCardColors('#301934');


    return (
        <View style={{ padding: 16, position: 'relative', flexDirection: 'row' }}>

      {/* First Card */}
      <Card style={{  height: 0.5* screenWidth, width: 0.4*screenWidth, borderRadius: 0.1 * screenWidth, position: 'absolute',  left: 20, backgroundColor: colors.lightColor, zIndex: 1 }}>
        <Card.Content>
          <Title> 1</Title>
        </Card.Content>
      </Card>

      {/* Second Card (overlapping on Card 1) */}
      <Card style={{  height: 0.5 * screenWidth, width: 0.4*screenWidth, borderRadius: 0.1 * screenWidth, position: 'absolute',  left: 40, backgroundColor: colors.middleColor, zIndex: 2 }}>
        <Card.Content>
          <Title> 2</Title>
        </Card.Content>
      </Card>

      {/* Third Card (overlapping on Card 2) */}
      <Card style={{  height: 0.5 * screenWidth, width: 0.8*screenWidth, borderRadius: 0.1 * screenWidth, position: 'absolute',  left:60, backgroundColor: colors.originalColor, zIndex: 3}}>
        <Card.Content>
          <Title style={{color:"white"}}> 3</Title>
          <Paragraph style={{color:"white"}}>This is the third card slightly offset from the second one.</Paragraph>
        </Card.Content>
      </Card>
    </View>
    );

};

export default Post;