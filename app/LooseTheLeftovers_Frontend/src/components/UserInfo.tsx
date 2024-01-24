import React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import profileStyles from '../styles/profileStyles';
import globalscreenstyles from '../common/global_ScreenStyles';
import { retrieveUserSession } from '../../src/common/EncryptedSession';
import {} from '../../src/common/NetworkRequest';
import { SecureAPIReq } from '../../src/common/NetworkRequest';

async function fetchData(): Promise<ItemData[]> {
  try {
    console.log('helloWorld');
    // retrieve user_id
    const userSesh: Record<string, string> = await retrieveUserSession();
    console.log('User Session:', userSesh);

    // Extract User ID
    const userId: string = userSesh['user_id'];
    console.log('User ID:', userId);

    // Perform Secure API Request
    const newReq: SecureAPIReq = await SecureAPIReq.createInstance();

    // Set the timeout property to 5000 milliseconds (5 seconds), for example
    const timeoutMilliseconds = 5000;

    const res: any = await newReq.get(`users/${userId}`, {
      timeout: timeoutMilliseconds,
    });

    // Retrieve Data
    console.log('this a message to determine position of error');
    const data: ItemData[] = res.data;

    return data;
    // do something with the data
  } catch (error: any) {
    // Log detailed Axios error information
    if (error.response) {
      // The request was made, but the server responded with a status code outside of the 2xx range
      console.error('Response Data:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('Request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error Message:', error.message);
    }

    // Rethrow the error to maintain the promise rejection
    throw new Error('Failed to fetch data');
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

// Functional Component Declaration
const UserInfo: React.FC = () => {
  // State Initialization
  const [data, setData] = useState<ItemData[]>();

  // UseEffect Hook for Data Fetching on Component Mount
  useEffect(() => {
    try {
      const fetchDataAndSetData = async () => {
        const result = await fetchData();
        setData(result);
      };
      fetchDataAndSetData();
    } catch (error) {
      // Log or handle the error globally
      console.error('Global Error Handler:', error);
    }
  });

  // Render Item Function
  const renderItem = ({ item }: { item: ItemData }) => <Item item={item} />;

  // Final Render
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

// Export Statement

export default UserInfo;

// try{
//   // retrieve user_id
//   const userSesh: string = await retrieveUserSession();
//   const userId: string = userSesh['user_id'];

//   // perform request
//   const newReq: SecureAPIReq = await SecureAPIReq.createInstance();
//   const res: any = await newReq.get(`users/${user_id}`);

//   // retrieve data
//   const data: any = res.data;

//   // do something with the data
// }
// catch{
//   // do something with the error
// }

// type ItemData = {
//   key: string;
//   title: string;
// };

// type ItemProps = {
//   item: ItemData;
// };

// const Item = ({ item }: ItemProps) => (
//   <View style={[profileStyles.item]}>
//     <Text style={[profileStyles.title]}>{item.title}</Text>
//   </View>
// );

// const UserInfo = () => {
// const [data, setData] = useState<ItemData[]>([]);

// useEffect(() => {
//   const fetchDataAndSetState = async () => {
//     try {
//       const fetchedData = await fetchData();
//       setData(fetchedData);
//     } catch (error) {
//       // handle error
//       console.error('Error fetching data');
//     }
//   };

//   fetchDataAndSetState();
// }, []); // empty dependency array means this effect runs once on component mount

//   const renderItem = ({ item }: { item: ItemData }) => {
//     return <Item item={item} />;
//   };

//   return (
//     <View style={globalscreenstyles.container}>
//       <SafeAreaView style={profileStyles.userInformation}>
//         <FlatList
//           data={fetchData}
//           renderItem={renderItem}
//           keyExtractor={item => item.key}
//         />
//       </SafeAreaView>
//     </View>
//   );
// };

// export default UserInfo;

// async function fetchData() {
//   try {
//     // retrieve user_id
//     const userSesh: string = await retrieveUserSession();
//     const userId: string = userSesh['user_id'] as string;

//     // perform request
//     const newReq: SecureAPIReq = await SecureAPIReq.createInstance();
//     const res: any = await newReq.get(`users/${userId}`);

//     // retrieve data
//     const data: any = res.data;
//     return data;
//     // do something with the data
//   } catch {
//     // do something with the error
//   }
// }

// interface UserSession {
//   user_id: string;
//   // Add other properties as needed
// }

// async function fetchData(): Promise<ItemData[]> {
//   try {
//     // Use the UserSession type when defining userSesh
//     const userSesh: UserSession = await retrieveUserSession();
//     const userId: string = userSesh.user_id;

//     // perform request
//     const newReq: SecureAPIReq = await SecureAPIReq.createInstance();
//     const res: any = await newReq.get(`users/${userId}`);

//     // retrieve data
//     const data: ItemData[] = res.data;
//     return data;
//   } catch (error) {
//     // handle the error
//     console.error('Error:');
//     throw error; // rethrow the error if needed
//   }
// }
