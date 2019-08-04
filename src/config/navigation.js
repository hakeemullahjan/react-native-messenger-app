import React from 'react';

import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

import * as Router from '../screens/index'

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';



const AppNavigator = createStackNavigator({
  Bottom: {
    screen: createBottomTabNavigator({
      'Chat List': {
        screen: Router.ChatList,
        navigationOptions: {
          tabBarLabel: 'Chats',
          tabBarIcon: ({ focused, tintColor }) => (
            <Feather name='message-circle' size={35} color={focused ? 'black' : 'gray'} />
          )
        }
      },
      People: {
        screen: Router.People,
        navigationOptions: {
          tabBarLabel: 'People',
          tabBarIcon: ({ tintColor, focused }) => (
            <SimpleLineIcons name='people' size={31} size={35} color={focused ? 'black' : 'gray'} />
          )
        }

      },
      Discover: {
        screen: Router.Discover,
        navigationOptions: {
          tabBarLabel: 'Discover',
          tabBarIcon: ({ tintColor, focused }) => (
            <Feather name='compass' size={30} size={35} color={focused ? 'black' : 'gray'} />
          )
        }
      }
    },
      {
        navigationOptions: { header: null }
      })
  },
  // 'Chat List': {
  //   screen: Router.ChatList
  // },
  Chat: {
    screen: Router.Chat
  },
  Cam: {
    screen: Router.Cam,
    navigationOptions: {
      header: null
    }
  },

});

const MainNavigator = createSwitchNavigator({
  Auth: {
    screen: Router.Auth
  },
  AppNavigator: {
    screen: AppNavigator
  },

})


export default createAppContainer(MainNavigator);