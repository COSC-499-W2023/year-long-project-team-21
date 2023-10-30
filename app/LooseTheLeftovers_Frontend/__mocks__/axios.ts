const post = jest.fn(() =>
  Promise.resolve({ data: { token: 'fake_token' }, status: 200 }),
);

export default { post };
