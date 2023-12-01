import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { global } from '../common/global_styles';
import { UpperBarProps } from '../common/Types';
import Icon from '../components/Icon';

/**
 * UpperBar (Header) component.
 *
 * Displays a header with customizable left and right icons and a title.
 *
 * @component
 * @param {HeaderProps} props - Props for the Header component.
 * @param {() => void} props.onLeftPress - Callback function to execute when the left icon is pressed.
 * @param {() => void} props.onRightPress - Callback function to execute when the right icon is pressed.
 * @param {ImageSourcePropType} props.leftIconSource - The image source for the left icon.
 * @param {ImageSourcePropType} props.rightIconSource - The image source for the right icon.
 */
const Header: React.FC<UpperBarProps> = ({
  onLeftPress,
  onRightPress,
  leftIconSource,
  rightIconSource,
}) => {
  return (
    <View style={styles.header}>
      <Icon
        source={leftIconSource}
        size={30}
        onPress={onLeftPress}
        containerStyle={styles.iconContainer}
        imageStyle={styles.icon}
      />
      <Text style={styles.title}>Create an Ad</Text>
      <Icon
        source={rightIconSource}
        size={30}
        onPress={onRightPress}
        containerStyle={styles.iconContainer}
        imageStyle={styles.icon}
      />
    </View>
  );
};

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
  },
  iconContainer: {
    padding: 8, // Adjust padding
  },
  icon: {
    // Add styles for the icon
  },
});

export default Header;
