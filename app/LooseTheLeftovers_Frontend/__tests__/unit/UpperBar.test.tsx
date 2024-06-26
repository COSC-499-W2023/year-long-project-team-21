import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import UpperBar from '../../src/components/UpperBar';
import { ImageSourcePropType } from 'react-native';

describe('UpperBar component', () => {
  const mockLeftIconSource: ImageSourcePropType = require('../../src/assets/banana.png');
  const mockRightIconSource: ImageSourcePropType = require('../../src/assets/profile-white.png');

  it('renders correctly with both icons and title', () => {
    const onLeftPressMock = jest.fn();
    const onRightPressMock = jest.fn();

    const { getByTestId, getByText } = render(
      <UpperBar
        onLeftPress={onLeftPressMock}
        onRightPress={onRightPressMock}
        leftIconSource={mockLeftIconSource}
        rightIconSource={mockRightIconSource}
        title='test-title'
      />,
    );

    expect(getByTestId('upperbar-test')).toBeDefined();
    expect(getByText('test-title')).toBeDefined();
  });

  it('calls onLeftPress function when the left icon is pressed', () => {
    const onLeftPressMock = jest.fn();
    const onRightPressMock = jest.fn();

    const { getByTestId } = render(
      <UpperBar
        onLeftPress={onLeftPressMock}
        onRightPress={onRightPressMock}
        leftIconSource={mockLeftIconSource}
        rightIconSource={mockRightIconSource}
      />,
    );

    const leftIcon = getByTestId('left-icon');
    fireEvent.press(leftIcon);
    expect(onLeftPressMock).toHaveBeenCalled();
  });

  it('calls onRightPress function when the right icon is pressed', () => {
    const onLeftPressMock = jest.fn();
    const onRightPressMock = jest.fn();

    const { getByTestId } = render(
      <UpperBar
        onLeftPress={onLeftPressMock}
        onRightPress={onRightPressMock}
        leftIconSource={mockLeftIconSource}
        rightIconSource={mockRightIconSource}
      />,
    );

    const rightIcon = getByTestId('right-icon');
    fireEvent.press(rightIcon);
    expect(onRightPressMock).toHaveBeenCalled();
  });
});
