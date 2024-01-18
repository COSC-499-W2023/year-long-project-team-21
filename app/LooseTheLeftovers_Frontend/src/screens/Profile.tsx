import { Text, View, FlatList } from 'react-native';
import React from 'react';
import { useState } from 'react';
import profileStyles from '../styles/profileStyles';
import globalscreenstyles from '../common/global_ScreenStyles';

const Profile = ({ navigation }: { navigation: any }) => {
  const mockData = [
    { id: 1, username: 'Nicholas Chamberlain', email: 'n3c777@gmail.com' },
  ];
  const [jsonData] = useState(mockData);

  return (
    <View style={globalscreenstyles.container}>
      <View style={profileStyles.userInformation}>
        <Text>Mock UserData</Text>
        <FlatList
          data={jsonData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={profileStyles.profileText}>
              {`Name: ${item.username}, Age: ${item.email}`}
            </Text>
          )}
        />
      </View>
    </View>
  );
};
export default Profile;
