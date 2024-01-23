import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import PostListRenderer from '../src/components/PostListRenderer';

describe('PostListRenderer component', () => {
  it('renders correctly with mock data', async () => {
    // Mock fetchData to resolve immediately with sample data
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({
        posts: [
          {
            id: 1,
            title: 'Test Post 1',
            image: 'test-image-1.jpg',
            expiryDate: '2024-01-31',
            category: 'nut, vegan',
          },
          {
            id: 2,
            title: 'Test Post 2',
            image: 'test-image-2.jpg',
            expiryDate: '2024-02-28',
            category: 'gluten-free',
          },
        ],
      }),
    } as Response);

    const { getByText, getByTestId, queryByTestId } = render(<PostListRenderer isHeaderInNeed={true} locationPermission={true} />);

    // Wait for the loading indicator to appear
    await waitFor(() => {
      expect(getByTestId('loader')).toBeTruthy();
    });

    // Wait for the component to render and fetch data
    await waitFor(() => {
      expect(queryByTestId('loader')).toBeNull(); // Ensure the loading indicator has disappeared
      expect(getByTestId('header title')).toBeTruthy();
      expect(getByTestId('select-radius-dropdown')).toBeTruthy();
      expect(getByText('Test Post 1')).toBeTruthy();
      expect(getByText('Test Post 2')).toBeTruthy();
    });
  });
  
    // it('renders loading indicator while fetching data', async () => {
    //   // Mock fetchData to delay and simulate loading
    //   jest.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}));
  
    //   const { getByTestId } = render(<PostListRenderer isHeaderInNeed={true} locationPermission={true} />);
      
    //   // Wait for the component to render and start fetching data
    //   await waitFor(() => {
    //     expect(getByTestId('loader')).toBeTruthy();
    //   });
    // });
  });