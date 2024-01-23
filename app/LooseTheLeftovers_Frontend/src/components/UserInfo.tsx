import React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import profileStyles from '../styles/profileStyles';
import globalscreenstyles from '../common/global_ScreenStyles';
import { retrieveUserSession } from '../../src/common/EncryptedSession';
import {} from '../../src/common/NetworkRequest';
import { SecureAPIReq } from '../../src/common/NetworkRequest';

interface UserSession {
  user_id: string;
  // Add other properties as needed
}

async function fetchData(): Promise<ItemData[]> {
  try {
    // Use the UserSession type when defining userSesh
    const userSesh: UserSession = await retrieveUserSession();
    const userId: string = userSesh.user_id;

    // perform request
    const newReq: SecureAPIReq = await SecureAPIReq.createInstance();
    const res: any = await newReq.get(`users/${userId}`);

    // retrieve data
    const data: ItemData[] = res.data;
    return data;
  } catch (error) {
    // handle the error
    console.error('Error:');
    throw error; // rethrow the error if needed
  }
}

type ItemData = {
  key: string;
  title: string;
};

type ItemProps = {
  item: ItemData;
};

const Item = ({ item }: ItemProps) => (
  <View style={[profileStyles.item]}>
    <Text style={[profileStyles.title]}>{item.title}</Text>
  </View>
);

const UserInfo = () => {
  const [data, setData] = useState<ItemData[]>([]);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        // handle error
        console.error('Error fetching data');
      }
    };

    fetchDataAndSetState();
  }, []); // empty dependency array means this effect runs once on component mount

  const renderItem = ({ item }: { item: ItemData }) => {
    return <Item item={item} />;
  };

  return (
    <View style={globalscreenstyles.container}>
      <SafeAreaView style={profileStyles.userInformation}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      </SafeAreaView>
    </View>
  );
};

export default UserInfo;
