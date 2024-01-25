import React from 'react';
import { render, waitFor, fireEvent, userEvent } from '@testing-library/react-native';
import PostListRenderer from '../src/components/PostListRenderer';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  }) as Promise<Response>
);

describe('PostListRenderer Component', () => {
  it('renders correctly', async () => {
    const { getByTestId, getByText } = render(<PostListRenderer isHeaderInNeed={true} locationPermission={true} navigation={{}} />);

    // Wait for the component to render
    await waitFor(() => expect(getByTestId('header title')).toBeTruthy());

    // Check if the title is displayed
    expect(getByText('Showing Posts Nearby')).toBeTruthy();
  });

  it('handles loading more data on end reached', async () => {
    const { getByTestId } = render(<PostListRenderer isHeaderInNeed={true} locationPermission={true} navigation={{}} />);

    // Wait for the component to render
    await waitFor(() => expect(getByTestId('header title')).toBeTruthy());

    // // Trigger onEndReached by scrolling
    // fireEvent.scroll(getByTestId('flatlist'), { nativeEvent: { contentSize: {height: 500, width: 300} , contentOffset: { y: 150, x: 0 } } , layoutMeasurement: { height: 100, width: 100 }});

    await userEvent.scrollTo(getByTestId('flatlist'), {
      y: 99999,
  });
  
    // Wait for data to be loaded
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Assert that the handleLoadMore function is called
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  // Add more tests as needed
});
