import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import TabBar from '../components/TabBar';

import globalscreenstyles from '../common/global_ScreenStyles';

import Logo from '../components/Logo';
import CreateAdIcon from '../components/CreateAdIcon';
import MessageIcon from '../components/MessageIcon';
import HomeIcon from '../components/HomeIcon';
import AccountIcon from '../components/AccountIcon';

const View_Post = ({ navigation }: { navigation: any }) => {
    return (
      <View style={globalscreenstyles.container}>
        <TabBar
          LeftIcon={<Logo LogoSize={15}></Logo>}
          RightIcon={<MessageIcon></MessageIcon>}></TabBar>
  
        <View>
            <Text>1</Text>
        </View>
  
        <TabBar
          LeftIcon={<HomeIcon></HomeIcon>}
          MiddleIcon={<CreateAdIcon></CreateAdIcon>}
          RightIcon={<AccountIcon></AccountIcon>}></TabBar>
      </View>
    );
  };
  
  export default View_Post;
  