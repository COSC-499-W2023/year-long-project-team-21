import { fireEvent, render, waitFor } from '@testing-library/react-native';
import EditProfile from '../../src/screens/EditProfile';
import React from 'react';
import mockAxios from '../../__mocks__/axios';
import { users } from '../../src/common/API';
import { SecureAPIReq } from '../../src/common/NetworkRequest';
import axios from 'axios';

jest.mock('axios');

const naviagation = {
  navigate: jest.fn(),
};
const route = {
  route: jest.fn(),
};

jest.mock('../../src/common/NetworkRequest', () => ({
  createInstance: jest.fn().mockResolvedValue({
    put: jest.fn().mockResolvedValue({
      status: 200, // Mocking a successful response with status code 200
    }),
  }),
}));

describe('Edit Profile Screen Test', () => {
  it('renders password change correctly', () => {
    const { getByTestId } = render(
      <EditProfile navigation={naviagation} route={route} />,
    );

    //check page for profile name, email edit
    expect(getByTestId('oldPasswordInputTitle')).toBeTruthy();
    expect(getByTestId('newPasswordInputTitle')).toBeTruthy();
    expect(getByTestId('confirmPasswordInputTitle')).toBeTruthy();
    expect(getByTestId('cancelButton')).toBeTruthy();
    expect(getByTestId('updateButton')).toBeTruthy();
  });

  it('renders profile edit correctly', () => {
    const { getByTestId } = render(
      <EditProfile navigation={naviagation} route={route} />,
    );

    // Click on the Password wiggle click
    fireEvent.press(getByTestId('leftClick'));

    //check page for profile name, email edit
    expect(getByTestId('firstNameInputTitle')).toBeTruthy();
    expect(getByTestId('lastNameInputTitle')).toBeTruthy();
    expect(getByTestId('emailInputTitle')).toBeTruthy();
    expect(getByTestId('cancelButton')).toBeTruthy();
    expect(getByTestId('updateButton')).toBeTruthy();
  });
});
