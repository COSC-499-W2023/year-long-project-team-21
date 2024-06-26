import React from 'react';
import { View } from 'react-native';
import globalscreenstyles from '../common/global_ScreenStyles';
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

const TabBarBottom: React.FC<TabBarProps> = ({
  LeftIcon,
  RightIcon,
  MiddleIcon,
}) => {
  return (
    <View style={tabBarStyles.containerBottom}>
      <View testID="TabBarLeftIconTest" style={tabBarStyles.leftBottom}>
        {LeftIcon}
      </View>
      <View testID="TabBarMiddleIconTest" style={tabBarStyles.middleBottom}>
        {MiddleIcon}
      </View>
      <View testID="TabBarRightIconTest" style={tabBarStyles.rightBottom}>
        {RightIcon}
      </View>
    </View>
  );
};

export default TabBarBottom;
