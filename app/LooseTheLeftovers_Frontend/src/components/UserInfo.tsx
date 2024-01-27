import React from 'react';
import { View, Text } from 'react-native';
import profileStyles from '../styles/profileStyles';
import globalscreenstyles from '../common/global_ScreenStyles';
import { UserInfoProps } from '../common/Types';

const UserInfo: React.FC<UserInfoProps> = ({ userInfo, userInfoKeys }) => {
  return (
    <View style={globalscreenstyles.container}>
      <View style={profileStyles.userInformation}>
        {userInfoKeys.map(key => (
          <Text key={key} style={profileStyles.profileText}>
            {userInfo[key]}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default UserInfo;
