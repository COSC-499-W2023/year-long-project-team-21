import Button from '../src/components/Button';
import { fireEvent, render } from '@testing-library/react-native';

describe('Button component', () => {
  it('renders correctly with the provided label', () => {
    //set
    const label = 'test';
    const onPressMock = jest.fn();

    //render
    const { getByText } = render(
      <Button onPress={onPressMock} title={label} />,
    );
    const buttonElement = getByText(label);

    //assert
    expect(buttonElement).toBeDefined();
  });

  it('calls onPress function when the button is pressed', () => {
    //set
    const label = 'test';
    const onPressMock = jest.fn();

    //call onPress
    const { getByText } = render(
      <Button onPress={onPressMock} title={label} />,
    );
    const buttonElement = getByText(label);
    fireEvent.press(buttonElement);

    //assert
    expect(onPressMock).toHaveBeenCalled();
  });
});
