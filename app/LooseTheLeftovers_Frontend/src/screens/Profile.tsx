import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import profileStyles from '../styles/profileStyles';
import globalscreenstyles from '../common/global_ScreenStyles';

type ItemData = {
  id: string;
  title: string;
};

const DATA: ItemData[] = [
  {
    id: 'Name',
    title: 'Nicholas Chamberlain',
  },
  {
    id: 'email',
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
const Profile = () => {
  const renderItem = ({ item }: { item: ItemData }) => {
    return <Item item={item} />;
  };
  return (
    <View style={globalscreenstyles.container}>
      <SafeAreaView style={profileStyles.userInformation}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

export default Profile;
