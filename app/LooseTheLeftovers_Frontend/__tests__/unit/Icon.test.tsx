import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Icon from '../../src/components/Icon';

describe('Icon Component Tests', () => {
  it('triggers onPress event with local image', () => {
    const mockOnPress = jest.fn();
    const localImageSource = require('../../src/assets/test-home.png');

    const { getByTestId } = render(
      <Icon
        source={localImageSource}
        size={30}
        onPress={mockOnPress}
        testID="icon-test"
      />,
    );

    // Icon pressed
    const icon = getByTestId('icon-test');
    fireEvent.press(icon);

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('triggers onPress event with remote image', () => {
    const mockOnPress = jest.fn();
    const remoteImageSource = {
      uri: 'https://imgtr.ee/images/2023/11/09/17cba266c9b2443e11f53e1a3cc736a5.png',
    };

    const { getByTestId } = render(
      <Icon
        source={remoteImageSource}
        size={30}
        onPress={mockOnPress}
        testID="icon-test-remote"
      />,
    );

    // Icon pressed
    const icon = getByTestId('icon-test-remote');
    fireEvent.press(icon);

    expect(mockOnPress).toHaveBeenCalled();
  });
});
