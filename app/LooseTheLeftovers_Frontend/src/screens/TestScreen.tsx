import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import database from '../database';
import User from '../database/models/User';
import Ads from '../database/models/Ads';

const TestScreen = () => {
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');

  const addUser = async () => {
    await database.write(async () => {
      await User.createUser(username); // This is now much cleaner!
    });
  };

  const addAd = async () => {
    await database.write(async () => {
      const newUser = await database.get('users').query().fetch();
      if (newUser.length > 0) {
        await database.get('ads').create((ad: any) => {
          ad.title = title;
          ad.user_id = newUser[0].id.toString();
          // Assign other fields as necessary
          ad.description = 'Sample description'; // Replace with actual data
          ad.image = 'path/to/image'; // Replace with actual data
          ad.category = 'Sample category'; // Replace with actual data
          ad.expiry = new Date().getTime(); // Replace with actual expiry date
          ad.is_active = true; // Replace with actual status
          ad.postal_code = '12345'; // Replace with actual postal code
          ad.last_updated = new Date().getTime(); // Use current timestamp for last updated
        });
      }
    });
  };

  const retrieveUsers = async () => {
    const users = await database.get('users').query().fetch();
    console.log(users);
  };

  const retrieveAds = async () => {
    const ads = await database.get('ads').query().fetch();
    console.log(ads);
  };

  return (
    <View>
      <TextInput
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Add User" onPress={addUser} />
      <TextInput
        placeholder="Enter ad title"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Add Ad" onPress={addAd} />
      <Button title="Retrieve Users" onPress={retrieveUsers} />
      <Button title="Retrieve Ads" onPress={retrieveAds} />
    </View>
  );
};

export default TestScreen;
