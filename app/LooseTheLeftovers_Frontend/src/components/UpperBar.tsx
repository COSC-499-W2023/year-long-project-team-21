import React from 'react';
import { View, Text, StyleSheet, ImageSourcePropType } from 'react-native';
import { global } from '../common/global_styles';

import Icon from '../components/Icon';

type HeaderProps = {
  onBackPress: () => void;
  onQuitPress: () => void;
  leftIconSource: ImageSourcePropType;
  rightIconSource: ImageSourcePropType;
};

const Header: React.FC<HeaderProps> = ({
  onBackPress,
  onQuitPress,
  leftIconSource,
  rightIconSource,
}) => {
  return (
    <View style={styles.header}>
      <Icon
        source={leftIconSource}
        size={30}
        onPress={onBackPress}
        containerStyle={styles.iconContainer}
        imageStyle={styles.icon}
      />
      <Text style={styles.title}>Create an Ad</Text>
      <Icon
        source={rightIconSource}
        size={30}
        onPress={onQuitPress}
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
    padding: 8, // Adjust padding as needed
  },
  icon: {
    // Add styles for the icon if necessary
  },
});

export default Header;
