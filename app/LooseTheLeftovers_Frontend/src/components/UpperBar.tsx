import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/upperBarStyles';
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
  title,
}) => {
  const testID = 'upperbar-test';

  return (
    <View style={styles.header}>
      {leftIconSource ? (
        <Icon
          source={leftIconSource}
          size={30}
          onPress={onLeftPress}
          containerStyle={styles.iconContainer}
          imageStyle={styles.icon}
          testID='left-icon'
        />
      ) : (
        <View style={styles.placeholderIcon} />
      )}
      <Text style={styles.title} testID={testID}>
        {title}
      </Text>
      {rightIconSource ? (
        <Icon
          source={rightIconSource}
          size={30}
          onPress={onRightPress}
          containerStyle={styles.iconContainer}
          imageStyle={styles.icon}
          testID='right-icon'
        />
      ) : (
        <View style={styles.placeholderIcon} />
      )}
    </View>
  );
};

export default Header;
