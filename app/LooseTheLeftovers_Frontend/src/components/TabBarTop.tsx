import React from 'react';
import { View } from 'react-native';
import tabBarStyles from '../styles/tabBarStyles';
import { TabBarProps } from '../common/Types';

/**
 * Tabbar component.
 *
 * * @component
 * @param {TabBarProps} props - The props for the Tabbar component.
 * @param {ReactNode} props.LeftIcon - the input for the left component. Will take any type
 * @param {ReactNode} props.MiddleIcon - the input for the middle component. Will take any type
 * @param {ReactNode} props.RightIcon - the input for the right component. Will take any type
 * @example
 * <Texts texts="Words" />
 */

const TabBarTop: React.FC<TabBarProps> = ({
  LeftIcon,
  RightIcon,
  MiddleIcon,
}) => {
  return (
    <View style={tabBarStyles.containerTop}>
      <View testID="TabBarLeftIconTest" style={tabBarStyles.leftTop}>
        {LeftIcon}
      </View>
      <View testID="TabBarMiddleIconTest" style={tabBarStyles.middleTop}>
        {MiddleIcon}
      </View>
      <View testID="TabBarRightIconTest" style={tabBarStyles.rightTop}>
        {RightIcon}
      </View>
    </View>
  );
};

export default TabBarTop;
