import React from 'react';
import { View } from 'react-native';
import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import AccountIcon from '../components/AccountIcon';
import HomeIcon from '../components/HomeIcon';
import CreateAdIcon from '../components/CreateAdIcon';
import globalscreenstyles from '../common/global_ScreenStyles';
import MessageIcon from '../components/MessageIcon';
import PostListRenderer from '../components/PostListRenderer';

const Home = ({ navigation }: { navigation: any }) => {
  // const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);
  // const checkLocationPermission = async () => {
  //   try {
  //     const instance = await LocationService.CreateAndInitialize();
  //     setHasLocationPermission(instance.hasPermission);
  //   } catch (error) {
  //     console.error('Error checking location permission:', error);
  //     setHasLocationPermission(false); // Assume no permission in case of an error
  //   }
  // };
  return (
    <View style={globalscreenstyles.container}>
      <TabBarTop RightIcon={<MessageIcon></MessageIcon>}></TabBarTop>
      <View style={globalscreenstyles.body}>
        <PostListRenderer isHeaderInNeed={true}  navigation={navigation}/>
      </View>
      <TabBarBottom
        LeftIcon={<HomeIcon></HomeIcon>}
        MiddleIcon={<CreateAdIcon></CreateAdIcon>}
        RightIcon={<AccountIcon></AccountIcon>}></TabBarBottom>
    </View>
  );
};

export default Home;



