import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import UserInfo from '../src/components/UserInfo';
import { retrieveUserSession } from '../src/common/EncryptedSession';
import { SecureAPIReq } from '../src/common/NetworkRequest';

// Mocking the network request module
jest.mock('../src/common/NetworkRequest', () => ({
  SecureAPIReq: {
    createInstance: jest.fn(() => ({
      get: jest.fn(async (userId: string) => {
        return {
          data: {
            username: `mockUsername-${userId}`,
            email: `mockEmail-${userId}`,
          },
        };
      }),
    })),
  },
}));

describe('UserInfo Component', () => {
  test('displays the correct user information', async () => {
    // Render the component
    const { getByText } = render(
      <UserInfo userInfoKeys={['username', 'email']} />,
    );

    // Wait for the component to fetch user information
    await waitFor(async () => {
      const userSesh: Record<string, string> = await retrieveUserSession();
      const userId: string = userSesh['user_id'];

      // Create a SecureAPIReq instance and make a fake API call
      const newReq: any = await SecureAPIReq.createInstance(); // 'any' to avoid TypeScript errors
      const res: any = await newReq.get(`users/${userId}`);

      const data = res.data;

      // Check if each piece of user information is present in the rendered component
      expect(getByText(data.username)).toBeTruthy();
      expect(getByText(data.email)).toBeTruthy();
    });
  });
});

///////

// import React from 'react';
// import { render, waitFor } from '@testing-library/react-native';
// import UserInfo from '../src/components/UserInfo';
// import { retrieveUserSession } from '../src/common/EncryptedSession';
// import { SecureAPIReq } from '../src/common/NetworkRequest';

// describe('UserInfo Component', () => {
//   test('displays the correct user information', async () => {
//     // Render the component
//     const { getByText } = render(
//       <UserInfo userInfoKeys={['username', 'email']} />,
//     );

//     // Wait for the component to fetch user information
//     await waitFor(async () => {
//       const userSesh: Record<string, string> = await retrieveUserSession();
//       //gets user id from session data
//       const userId: string = userSesh['user_id'];

//       //retreives user data using userid
//       const newReq: SecureAPIReq = await SecureAPIReq.createInstance();
//       const res: any = await newReq.get(`users/${userId}`);

//       const data = res.data;

//       // Check if each piece of user information is present in the rendered component
//       expect(getByText(data.username)).toBeTruthy();
//       expect(getByText(data.email)).toBeTruthy();
//     });
//   });
// });

// import React from 'react';
// import { render } from '@testing-library/react-native'; // Note the addition of `waitFor`

// import UserInfo from '../src/components/UserInfo';

// type ItemData = {
//   key: string;
//   title: string;
// };

// const DATA: ItemData[] = [
//   {
//     key: 'Name',
//     title: 'Nicholas Chamberlain',
//   },
//   {
//     key: 'Email',
//     title: 'n3c777@gmail.com',
//   },
// ];

////////

// test('displays the correct user information', () => {
//   const { getByText } = render(<UserInfo userInfoKeys={['username', 'email']}></UserInfo>>);

//   // Check if each title from mock data is present in the rendered component
//   DATA.forEach(item => {
//     const titleElement = getByText(item.title);
//     expect(titleElement).toBeTruthy();
//   });
// });
