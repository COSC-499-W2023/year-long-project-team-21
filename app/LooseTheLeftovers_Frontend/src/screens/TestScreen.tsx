import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import database from '../database';
import User from '../database/models/User';
import Ads from '../database/models/Ads';

const TestScreen = () => {
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');

  const addUser = async () => {
    await database.write(async () => {
      await User.createUser(username);
    });
  };

  const addAd = async () => {
    await database.write(async () => {
      const newUser = await database.get('users').query().fetch();
      if (newUser.length > 0) {
        await Ads.createAd(
          title,
          'Sample description',
          'path/to/image',
          'Sample category',
          new Date(),
          true,
          '12345',
          newUser[0].id // Assume attaching it to the first user
        );
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
