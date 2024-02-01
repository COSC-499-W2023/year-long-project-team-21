import React from 'react';
import { render } from '@testing-library/react-native';
import TopTabBar from '../../src/components/TabBarTop';
import BottomTabBar from '../../src/components/TabBarBottom';
import { Text } from 'react-native';
import Title from '../../src/components/Title';
import Logo from '../../src/components/Logo';

//tests if TabBar renders
describe('TopTabBar', () => {
  it('tests if TabBar alone renders', () => {
    render(<TopTabBar />);
  });
});
//tests if tab bar renders with non icon items, since there are already tests for each icon already
it('tests if TopTabBar with LeftIcon, MiddleIcon, and RightIcon renders ', () => {
  const { getByTestId } = render(
    <TopTabBar
      LeftIcon={<Text>Left</Text>}
      MiddleIcon={<Title title="testtitle"></Title>}
      RightIcon={<Logo></Logo>}
    />,
  );

  expect(getByTestId('TabBarLeftIconTest')).toBeTruthy();
  expect(getByTestId('TabBarMiddleIconTest')).toBeTruthy();
  expect(getByTestId('TabBarRightIconTest')).toBeTruthy();
});

describe('BottomTabBar', () => {
  it('tests if BottomTabBar alone renders', () => {
    render(<BottomTabBar />);
  });
});
//tests if tab bar renders with non icon items, since there are already tests for each icon already
it('tests if TabBar with LeftIcon, MiddleIcon, and RightIcon renders ', () => {
  const { getByTestId } = render(
    <BottomTabBar
      LeftIcon={<Text>Left</Text>}
      MiddleIcon={<Title title="testtitle"></Title>}
      RightIcon={<Logo></Logo>}
    />,
  );

  expect(getByTestId('TabBarLeftIconTest')).toBeTruthy();
  expect(getByTestId('TabBarMiddleIconTest')).toBeTruthy();
  expect(getByTestId('TabBarRightIconTest')).toBeTruthy();
});
