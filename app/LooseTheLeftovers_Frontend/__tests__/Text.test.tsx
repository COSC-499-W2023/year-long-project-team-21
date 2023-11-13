import Text from '../src/components/Text';
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

describe('text press', () => {
  it('renders correctly with the provided label', () => {
    //set
    const label = 'test';
    const onPressMock = jest.fn();

    //render
    const { getByText } = render(<Text onPress={onPressMock} texts={label} />);
    const textElement = getByText(label);

    //assert
    expect(textElement).toBeDefined();
  });

  it('calls onPress function when the text is pressed', () => {
    //set
    const label = 'test';
    const onPressMock = jest.fn();

    //call onPress
    const { getByText } = render(<Text onPress={onPressMock} texts={label} />);
    const textElement = getByText(label);
    fireEvent.press(textElement);

    //assert
    expect(onPressMock).toHaveBeenCalled();
  });
});
