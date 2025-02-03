import React from 'react'
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='welcome1' />
      <Stack.Screen name='welcome2' />
      <Stack.Screen name='welcome3' />
      <Stack.Screen name='register' />
      <Stack.Screen name='login' />
      <Stack.Screen name='forgotPassword' />
      <Stack.Screen name='tabs' />
      <Stack.Screen name='pinSetup' />
    </Stack>
  )
}

export default _layout