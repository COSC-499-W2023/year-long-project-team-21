import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Post from '../src/components/Post'; // Update the import path accordingly

describe('Post Component', () => {
  const mockPost = {
    id: 1,
    title: 'Sample Post',
    description: 'this is sample description',
    image: '/sample-image.jpg',
    expiryDate: '2024-12-31',
    category: 'nut',
    endpoint: 'mock_endpoint',
  };

  it('renders without crashing', () => {
    // color and endipoint should be assigned to render properly
    const { getByText, getByTestId } = render(
      <Post color={'expiry_short'} {...mockPost} />,
    );

    // Check if the title is rendered
    const titleElement = getByText(mockPost.title);
    expect(titleElement).toBeTruthy();

    // Check if the expiry date is rendered
    const expiryDateElement = getByText(mockPost.expiryDate);
    expect(expiryDateElement).toBeTruthy();

    // Check if the hidden icons are rendered (assuming the category is 'nut' in this case)
    const nutIcon = getByTestId('hiddenIcons');
    expect(nutIcon).toBeTruthy();
  });

  it('handles click events', async () => {
    // Mock navigation prop
    const mockNavigate = jest.fn();
    const navigation = { navigate: mockNavigate };

    const { getByText } = render(
      <Post color={'expiry_short'} {...mockPost} navigation={navigation} />,
    );

    // // Trigger a click event on the component
    fireEvent.press(getByText(mockPost.title));

    // Check if navigate function is called with the correct arguments
    expect(mockNavigate).toHaveBeenCalledWith('View_Post', {
      postId: 1,
      endpoint: 'mock_endpoint',
    });
  });
});
