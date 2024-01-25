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
  };

  it('renders without crashing', () => {
    const { getByText, getByTestId } = render(<Post {...mockPost} />);

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

  //   it('handles click events', async () => {
  //     const { getByText } = render(<Post {...mockPost} />);

  //     // Trigger a click event on the component
  //     fireEvent.press(getByText(mockPost.title));

  //     // Wait for animations to complete (if any)
  //     await waitFor(() => {
  //       // Add any assertions or expectations for the post-click state if needed
  //     });
  //   });
});
