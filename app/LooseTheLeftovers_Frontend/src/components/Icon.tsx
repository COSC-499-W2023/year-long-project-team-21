import React from 'react';
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

interface IconProps {
  source: ImageSourcePropType;
  size?: number;
  onPress: () => void;
  testID?: string;
}

const Icon: React.FC<IconProps> = ({ source, size = 24, onPress, testID }) => {
  return (
    <TouchableOpacity onPress={onPress} testID={ testID }>
      <Image
        source={source}
        style={[{ width: size, height: size }, ]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default Icon;
