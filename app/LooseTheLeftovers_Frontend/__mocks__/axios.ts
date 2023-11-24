const post = jest.fn(() =>
  Promise.resolve({ 
    data: { 
      accessToken: 'fake_access_token',
      refreshToken: 'fake_refresh_token' 
    }, 
    status: 200 
  }),
);

export default { post };
