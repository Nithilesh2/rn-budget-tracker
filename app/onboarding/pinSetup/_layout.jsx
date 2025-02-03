import React from 'react'
import { Tabs } from 'expo-router';

const _layout = () => {
  return (
    <>
      <Tabs screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name='forgotPin' />
      </Tabs>
    </>
  )
}

export default _layout