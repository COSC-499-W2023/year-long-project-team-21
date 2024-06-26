import React from 'react';

import { View, Image } from 'react-native';
import styles from '../styles/headerStyles';
import { type HeaderProps } from '../common/Types';

/**
 * Header component that displays an image.
 *
 * @component
 * @param {HeaderProps} props - The props for the Header component.
 * @param {string} props.image - URL of the image to be displayed in the header.
 *
 * @example
 * <Header image="https://example.com/my-image.jpg" />
 */
const Header: React.FC<HeaderProps> = ({ image }) => {
  return (
    <View style={styles.header}>
      <Image
        source={{ uri: image }}
        style={styles.headerImage}
        testID="header-image"
      />
    </View>
  );
};

export default Header;
