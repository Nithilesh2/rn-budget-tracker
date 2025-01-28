import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const profile = () => {

  const router = useRouter()
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedIn');
      router.replace('onboarding/login')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <View>
      <Text>profile</Text>
      <Button title='Logout' onPress={handleLogout} />
    </View>
  )
}

export default profile