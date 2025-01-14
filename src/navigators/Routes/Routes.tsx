import {StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import UserStack from '../UserStack/UserStack';
import AppStack from '../appStack/AppStack';
import AuthStack from '../authStack/AuthStack';
import {navigationRef} from '../NavigationService';

const Routes = () => {
  const MainStack = createNativeStackNavigator();
  const routeNameRef = useRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }>
      <MainStack.Navigator
        initialRouteName={'AuthStack'}
        screenOptions={{headerShown: false}}>
        <MainStack.Screen name="AuthStack" component={AuthStack} />
        <MainStack.Screen name="AppStack" component={AppStack} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
