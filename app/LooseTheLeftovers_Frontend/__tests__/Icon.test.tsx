import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Icon from '../src/components/Icon';
import Config from 'react-native-config';

describe('Icon Component Tests', () => {
  it('triggers onPress event with local image', () => {
    const mockOnPress = jest.fn();
    const localImageSource = require('../src/assets/test-home.png');

    const { getByTestId } = render(
      <Icon
        source={localImageSource}
        size={30}
        onPress={mockOnPress}
        testID="icon-test"
      />,
    );

    // icon pressed
    const icon = getByTestId('icon-test');
    fireEvent.press(icon);

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('triggers onPress event with remote image', () => {
    const mockOnPress = jest.fn();
    const remoteImageSource = { uri: Config.ICON_TEST_URL };

    const { getByTestId } = render(
      <Icon
        source={remoteImageSource}
        size={30}
        onPress={mockOnPress}
        testID="icon-test-remote"
      />,
    );

    // icon pressed
    const icon = getByTestId('icon-test-remote');
    fireEvent.press(icon);

    expect(mockOnPress).toHaveBeenCalled();
  });
});
