import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import UserInfo from '../components/UserInfo';
import globalscreenstyles from '../common/global_ScreenStyles';
import TabBarTop from '../components/TabBarTop';
import AccountIcon from '../components/AccountIcon';
import HomeIcon from '../components/HomeIcon';
import CreateAdIcon from '../components/CreateAdIcon';
import TabBarBottom from '../components/TabBarBottom';
import MessageIcon from '../components/MessageIcon';
import { global } from '../common/global_styles';
import Ratings from '../components/Ratings';
import {
  removeUserSession,
  retrieveUserSession,
} from '../../src/common/EncryptedSession';
import { SecureAPIReq } from '../../src/common/NetworkRequest';
import PostListRenderer from '../components/PostListRenderer';
import { adEndpoint, usersAds } from '../common/API';
import profileStyles from '../styles/profileStyles';
import Button from '../components/Button';

const Profile = ({ navigation }: { navigation: any }) => {
  const [userID, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [data, setData] = useState('');

  const handleButtonOnPress = async () => {
    try {
      // Retrieve the current user session
      const session = await retrieveUserSession();

      if (session) {
        // Remove the user session
        await removeUserSession();
        navigation.navigate('Registration');
      } else {
        throw new Error('No active user session found');
      }
    } catch (error) {
      // Handle errors
      console.error('Error during logout:', error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      // init class for new request
      const newReq: any = await SecureAPIReq.createInstance();
      // Retrieve session data
      const userSesh: Record<string, string> = await retrieveUserSession();
      // Gets user id from session data
      const userId: string = userSesh['user_id'];
      // set state appropriately
      setUserId(userId);
      // call backend to retrieve
      const res: any = await newReq.get(`users/${userId}`);
      // set state
      setUserInfo({ username: res.data.username, email: res.data.email });
      // no longer loading (wonder if nec?)
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  // function passed down as a prop to handle retrieving ads for users
  async function fetchAds(pageNumber: number) {
    const req: SecureAPIReq = await SecureAPIReq.createInstance();
    const endpoint: string = `${usersAds}${userID}/?page=${pageNumber}`;
    const payload: any = await req.get(endpoint);
    return payload.data;
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const [ratings, setRatings] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const newReq: any = await SecureAPIReq.createInstance();
      try {
        const endpoint = '/ratings/';
        const params = { rating: ratings };
        const res = await newReq.get(endpoint, params);

        setRatings(res.ratings);
      } catch (error) {
        console.error('Failed to fetch rating info:', error);
        setRatings(0);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={globalscreenstyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={globalscreenstyles.container}>
      <TabBarTop RightIcon={<MessageIcon />} />
      <View style={globalscreenstyles.middle}>
        <View style={profileStyles.userinfocontainer}>
          <UserInfo userInfo={userInfo} userInfoKeys={['username', 'email']} />
          <View style={{ marginTop: '-15%' }}>
            <Ratings
              startingValue={ratings}
              readonly={true}
              backgroundColor={global.tertiary}></Ratings>
          </View>

          <View style={profileStyles.button}>
            <Button onPress={handleButtonOnPress} title="Logout"></Button>
          </View>
        </View>

        <View style={profileStyles.viewPost}>
          <PostListRenderer
            isHeaderInNeed={false}
            endpoint={adEndpoint}
            getData={fetchAds}
            navigation={navigation}
          />
        </View>
      </View>

      <TabBarBottom
        LeftIcon={<HomeIcon />}
        MiddleIcon={<CreateAdIcon />}
        RightIcon={<AccountIcon />}
      />
    </View>
  );
};

export default Profile;

// import React, { useState, useEffect } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import UserInfo from '../components/UserInfo';
// import globalscreenstyles from '../common/global_ScreenStyles';
// import TabBarTop from '../components/TabBarTop';
// import AccountIcon from '../components/AccountIcon';
// import HomeIcon from '../components/HomeIcon';
// import CreateAdIcon from '../components/CreateAdIcon';
// import TabBarBottom from '../components/TabBarBottom';
// import MessageIcon from '../components/MessageIcon';
// import { global } from '../common/global_styles';
// import Ratings from '../components/Ratings';
// import {
//   removeUserSession,
//   retrieveUserSession,
// } from '../../src/common/EncryptedSession';
// import { SecureAPIReq } from '../../src/common/NetworkRequest';
// import PostListRenderer from '../components/PostListRenderer';
// import { adEndpoint, usersAds } from '../common/API';
// import profileStyles from '../styles/profileStyles';
// import Button from '../components/Button';

// const Profile = ({ navigation }: { navigation: any }) => {
//   const [userID, setUserId] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [userInfo, setUserInfo] = useState({ username: '', email: '' });
//   const [data, setData] = useState('');

//   const handleButtonOnPress = async () => {
//     try {
//       // Retrieve the current user session
//       const session = await retrieveUserSession();

//       if (session) {
//         // Remove the user session
//         await removeUserSession();
//         navigation.navigate('Registration');
//       } else {
//         throw new Error('No active user session found');
//       }
//     } catch (error) {
//       // Handle errors
//       console.error('Error during logout:', error);
//     }
//   };

//   const fetchUserInfo = async () => {
//     try {
//       // init class for new request
//       const newReq: any = await SecureAPIReq.createInstance();
//       // Retrieve session data
//       const userSesh: Record<string, string> = await retrieveUserSession();
//       // Gets user id from session data
//       const userId: string = userSesh['user_id'];
//       // set state appropriately
//       setUserId(userId);
//       // call backend to retrieve
//       const res: any = await newReq.get(`users/${userId}`);
//       // set state
//       setUserInfo({ username: res.data.username, email: res.data.email });
//       // no longer loading (wonder if nec?)
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Failed to fetch user info:', error);
//     }
//   };

//   // function passed down as a prop to handle retrieivng ads for users
//   async function fetchAds(pageNumber: number) {
//     const req: SecureAPIReq = await SecureAPIReq.createInstance();
//     const endpoint: string = `${usersAds}${userID}/?page=${pageNumber}`;
//     const payload: any = await req.get(endpoint);
//     return payload.data;
//   }

//   useEffect(() => {
//     fetchUserInfo();
//   }, []);

//   if (isLoading) {
//     // @ todo find one that is not so intruisvie.
//     return <ActivityIndicator size="large" />;
//   }

//   // const getRatings = async () => {
//   //   try {
//   //     // init class for new request
//   //     const newReq: any = await SecureAPIReq.createInstance();
//   //     // Retrieve session data
//   //     const userSesh: Record<string, string> = await retrieveUserSession();
//   //     // Gets user id from session data
//   //     const userId: string = userSesh['user_id'];
//   //     // set state appropriately
//   //     setUserId(userId);
//   //     // call backend to retrieve
//   //     const res: any = await newReq.get(`users/${userId}`);

//   //     return res.data.ratings;
//   //   } catch (error) {
//   //     console.error('Failed to fetch rating info:', error);
//   //   }
//   //   return 0;
//   // };

//   const [ratings, setRatings] = useState<number | undefined>(undefined);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const newReq: any = await SecureAPIReq.createInstance();
//         const userSesh: Record<string, string> = await retrieveUserSession();
//         const userId: string = userSesh['user_id'];
//         setUserId(userId);
//         const res: any = await newReq.get(`users/${userId}`);
//         setRatings(res.data.ratings);
//       } catch (error) {
//         console.error('Failed to fetch rating info:', error);
//         setRatings(0);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <View style={globalscreenstyles.container}>
//       <TabBarTop RightIcon={<MessageIcon />} />
//       <View style={globalscreenstyles.middle}>
//         <View style={profileStyles.userinfocontainer}>
//           <UserInfo userInfo={userInfo} userInfoKeys={['username', 'email']} />
//           <View style={{ marginTop: '-15%' }}>
//             <Ratings
//               startingValue={ratings}
//               readonly={true}
//               backgroundColor={global.tertiary}></Ratings>
//           </View>

//           <View style={profileStyles.button}>
//             <Button onPress={handleButtonOnPress} title="Logout"></Button>
//           </View>
//         </View>

//         <View style={profileStyles.viewPost}>
//           <PostListRenderer
//             isHeaderInNeed={false}
//             endpoint={adEndpoint}
//             getData={fetchAds}
//             navigation={navigation}
//           />
//         </View>
//       </View>

//       <TabBarBottom
//         LeftIcon={<HomeIcon />}
//         MiddleIcon={<CreateAdIcon />}
//         RightIcon={<AccountIcon />}
//       />
//     </View>
//   );
// };

// export default Profile;
