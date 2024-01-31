import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ExpirySlider from '../src/components/ExpirySlider';

describe('ExpirySlider component', () => {
  it('renders correctly', () => {
    const handleExpiryChangeMock = jest.fn();

    const { getByTestId } = render(
      <ExpirySlider onExpiryChange={handleExpiryChangeMock} />,
    );

    // Check if the slider is rendered
    const sliderElement = getByTestId('expiry-slider');
    expect(sliderElement).toBeDefined();
  });

  it('calls onExpiryChange function when the slider value changes', () => {
    const handleExpiryChangeMock = jest.fn();
    const newExpiryValue = 5;

    const { getByTestId } = render(
      <ExpirySlider onExpiryChange={handleExpiryChangeMock} />,
    );

    const sliderElement = getByTestId('expiry-slider');

    // Simulate changing the slider value
    fireEvent(sliderElement, 'onValueChange', newExpiryValue);

    // Check if the onExpiryChange function was called with the new expiry value
    expect(handleExpiryChangeMock).toHaveBeenCalledWith(newExpiryValue);
  });
});
