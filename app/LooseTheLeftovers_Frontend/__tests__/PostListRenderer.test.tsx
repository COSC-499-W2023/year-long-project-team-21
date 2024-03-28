import React from 'react';
import {
  render,
  waitFor,
} from '@testing-library/react-native';
import PostListRenderer from '../src/components/PostListRenderer';
import { NavigationContainer } from '@react-navigation/native';

// Mock the fetch function
(global.fetch as jest.Mock) = jest.fn(
  () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    }) as Promise<Response>,
);

describe('PostListRenderer Component', () => {
  it('renders correctly', async () => {
    const { getByTestId, getByText } = render(
      <NavigationContainer>
      <PostListRenderer
        isHeaderInNeed={true}
        locationPermission={true}
        navigation={{}}
        endpoint={''}
        getData={function () {
          throw new Error('Function not implemented.');
        }}
      />,
      </NavigationContainer>
    );

    // Wait for the component to render
    await waitFor(() => expect(getByTestId('header title')).toBeTruthy());

    // Check if the title is displayed
    expect(getByText('Showing Posts Nearby')).toBeTruthy();
  });
});
