import React from 'react';
import { render } from '@testing-library/react-native';
import TabBar from '../src/components/TabBarTop';
import { Text } from 'react-native';
import Title from '../src/components/Title';
import Logo from '../src/components/Logo';

//tests if TabBar renders
describe('TabBar', () => {
  it('tests if TabBar alone renders', () => {
    render(<TabBar />);
  });
});
//tests if tab bar renders with non icon items, since there are already tests for each icon already
it('tests if TabBar with LeftIcon, MiddleIcon, and RightIcon renders ', () => {
  const { getByTestId } = render(
    <TabBar
      LeftIcon={<Text>Left</Text>}
      MiddleIcon={<Title title="testtitle"></Title>}
      RightIcon={<Logo></Logo>}
    />,
  );

  expect(getByTestId('TabBarLeftIconTest')).toBeTruthy();
  expect(getByTestId('TabBarMiddleIconTest')).toBeTruthy();
  expect(getByTestId('TabBarRightIconTest')).toBeTruthy();
  expect(getByTestId('TabBarTest')).toBeTruthy();
});
