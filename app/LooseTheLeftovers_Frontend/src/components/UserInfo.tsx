import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import profileStyles from '../styles/profileStyles';
import globalscreenstyles from '../common/global_ScreenStyles';
//import { type UserInfoProps } from '../common/Types';

type ItemData = {
  key: string;
  title: string;
};

const DATA: ItemData[] = [
  {
    key: 'Name',
    title: 'Nicholas Chamberlain',
  },
  {
    key: 'Email',
    title: 'n3c777@gmail.com',
  },
];

type ItemProps = {
  item: ItemData;
};

const Item = ({ item }: ItemProps) => (
  <View style={[profileStyles.item]}>
    <Text style={[profileStyles.title]}>{item.title}</Text>
  </View>
);

const UserInfo = () => {
  const renderItem = ({ item }: { item: ItemData }) => {
    return <Item item={item} />;
  };
  return (
    <View style={globalscreenstyles.container}>
      <SafeAreaView style={profileStyles.userInformation}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      </SafeAreaView>
    </View>
  );
};

export default UserInfo;
