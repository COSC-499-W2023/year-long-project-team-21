import { Text, View, FlatList } from 'react-native';
import React from 'react';
import { useState } from 'react';

const Profile = ({ navigation }: { navigation: any }) => {
  const mockData = [
    { id: 1, username: 'Nicholas Chamberlain', email: 'n3c777@gmail.com' },
  ];
  const [jsonData] = useState(mockData);

  return (
    <View>
      <Text>Mock UserData</Text>
      <FlatList
        data={jsonData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{`Name: ${item.username}, Age: ${item.email}`}</Text>
          </View>
        )}
      />
    </View>
  );
};
export default Profile;
