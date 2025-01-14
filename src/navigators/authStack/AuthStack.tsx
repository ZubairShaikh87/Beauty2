import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import strings from '../../utils/strings/strings';
import {useSelector} from 'react-redux';
import {getUserType} from '../../Redux/Reducers/UserTypeSlice';
import {authRoutes} from './AuthRoutes';

const AuthStack = () => {
  const userType = useSelector(getUserType);
  const Stack = createNativeStackNavigator();
  const routes = authRoutes;
  return (
    <Stack.Navigator initialRouteName={strings?.splashscreen}>
      {routes?.map(route => (
        <Stack.Screen
          name={route?.name}
          component={route?.component}
          options={{title: route?.name, headerShown: false}}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStack;
