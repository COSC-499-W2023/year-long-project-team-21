import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import profileStyles from '../styles/profileStyles';
import globalscreenstyles from '../common/global_ScreenStyles';
import { UserInfoProps } from '../common/Types';

const UserInfo: React.FC<UserInfoProps> = props => {
  const { userInfo, userInfoKeys } = props;

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

// import React, { useState, useEffect } from 'react';
// import { ActivityIndicator, View, Text } from 'react-native';
// import profileStyles from '../styles/profileStyles';
// import globalscreenstyles from '../common/global_ScreenStyles';
// import { retrieveUserSession } from '../../src/common/EncryptedSession';
// import { SecureAPIReq } from '../../src/common/NetworkRequest';
// import { UserInfoProps } from '../common/Types';

// /**
//  * UserInfo component.
//  *
//  * * @component
//  * @param {UserInfoProps} props - The props for the UserInfo component.
//  * @param {string[]} props.userInfoKeys - An array of keys of the user information to display
//  * @example
//  * <UserInfo userInfoKeys={["username", "email"]} />
//  *
//  * The idea is that you can easily define the user information that you want at the time.
//  * If we want more than just email and username we can easily modify this too pull
//  * as much information as we want for all uses of this component and then only use we need each time.
//  */

// const UserInfo: React.FC<UserInfoProps> = props => {
//   const { userInfoKeys } = props;
//   const [userInfo, setUserInfo] = useState({ username: '', email: '' });
//   const [loading, setLoading] = useState(false);

//   const fetchUserInfo = async () => {
//     setLoading(true);
//     try {
//       //retreive session data
//       const userSesh: Record<string, string> = await retrieveUserSession();
//       //gets user id from session data
//       const userId: string = userSesh['user_id'];
//       console.log(userId);

//       //retreives user data using userid
//       const newReq: SecureAPIReq = await SecureAPIReq.createInstance();
//       const res: any = await newReq.get(`users/${userId}`);

//       const data = res.data;

//       setUserInfo({ username: data.username, email: data.email });
//     } catch (error) {
//       console.error('Failed to fetch user info:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   //fetches user info
//   useEffect(() => {
//     fetchUserInfo();
//     //the [] allows this to only load once
//   }, []);

//   if (loading) {
//     return <ActivityIndicator />;
//   }

//   return (
//     <View style={globalscreenstyles.container}>
//       <View style={profileStyles.userInformation}>
//         {/* maps out the requested user data  */}
//         {userInfoKeys.map(key => (
//           <Text key={key} style={profileStyles.profileText}>
//             {userInfo[key]}
//           </Text>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default UserInfo;
