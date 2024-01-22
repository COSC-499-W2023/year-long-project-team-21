import React from 'react';
import { render } from '@testing-library/react-native'; // Note the addition of `waitFor`

import UserInfo from '../src/components/UserInfo';

type ItemData = {
  key: string;
  title: string;
};

const DATA: ItemData[] = [
  {
    key: 'Name',
    title: 'Nicholas Chamberlain',
  },
  {
    key: 'Email',
    title: 'n3c777@gmail.com',
  },
];

test('displays the correct user information', () => {
  const { getByText } = render(<UserInfo />);

  // Check if each title from mock data is present in the rendered component
  DATA.forEach(item => {
    const titleElement = getByText(item.title);
    expect(titleElement).toBeTruthy();
  });
});
