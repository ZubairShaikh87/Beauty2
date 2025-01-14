import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../../utils/colors/colors';
import strings from '../../utils/strings/strings';
import UserHome from '../../screens/UserScreen/home/homeScreen/Home';
import {Images} from '../../assets/images';
import UserBooking from '../../screens/UserScreen/userBooking/UserBooking';
import UserSearch from '../../screens/UserScreen/search/UserSearch';
import UserProfile from '../../screens/UserScreen/UserProfile/UserProfile';

const UserBottomStack = () => {
  const UserBottom = createBottomTabNavigator();

  return (
    <UserBottom.Navigator
      initialRouteName={'بيت'}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 8,
          height: 55,
        },
      }}>
      <UserBottom.Screen
        name="بيت"
        component={UserHome}
        options={{
          tabBarActiveTintColor: Colors.primary,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused && (
                  <Image
                    style={{top: -7, marginLeft: 4}}
                    source={Images.polygon}
                  />
                )}
                <Image
                  source={Images.home2}
                  style={{
                    height: 27,
                    width: 27,
                    tintColor: focused ? Colors.primary : Colors.lightGrey,
                  }}
                />
              </View>
            );
          },
        }}
      />
      <UserBottom.Screen
        name="يبحث"
        component={UserSearch}
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused && (
                  <Image
                    style={{top: -7, marginLeft: 4}}
                    source={Images.polygon}
                  />
                )}

                <Image
                  source={Images.homeSearch}
                  style={{
                    height: 27,
                    width: 27,
                    tintColor: focused ? Colors.primary : Colors.lightGrey,
                  }}
                />
              </View>
            );
          },
        }}
      />
      <UserBottom.Screen
        name="الحجوزات"
        component={UserBooking}
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused && (
                  <Image
                    style={{top: -7, marginLeft: 4}}
                    source={Images.polygon}
                  />
                )}
                <Image
                  source={Images.calender2}
                  style={{
                    height: 27,
                    width: 27,
                    tintColor: focused ? Colors.primary : Colors.lightGrey,
                  }}
                />
              </View>
            );
          },
        }}
      />

      <UserBottom.Screen
        name="حساب تعريفي"
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused && (
                  <Image
                    style={{top: -7, marginLeft: 4}}
                    source={Images.polygon}
                  />
                )}
                <Image
                  source={Images.profile2}
                  style={{
                    height: 27,
                    width: 27,
                    tintColor: focused ? Colors.primary : Colors.lightGrey,
                  }}
                />
              </View>
            );
          },
        }}
      />
    </UserBottom.Navigator>
  );
};

export default UserBottomStack;

const styles = StyleSheet.create({});
