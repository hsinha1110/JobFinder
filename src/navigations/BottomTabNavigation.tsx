import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Screens from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomTabNavigationParamsList } from '../types';
import { Routes } from '../constants/Routes';

const Tab = createBottomTabNavigator<BottomTabNavigationParamsList>();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#0096FF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 60, paddingBottom: 5 },
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          switch (route.name) {
            case Routes.JOB_SEARCH_HOME:
              iconName = 'home-outline';
              break;

            case Routes.JOB_SEARCH_MESSAGING:
              iconName = 'bookmark-outline';
              break;

            case Routes.JOB_SEARCH_STACK:
              iconName = 'search-outline';
              break;

            case Routes.JOB_SEARCH_PROFILE:
              iconName = 'person-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={Routes.JOB_SEARCH_HOME}
        component={Screens.JobSearchHomeScreen}
      />

      <Tab.Screen
        name={Routes.JOB_SEARCH_MESSAGING}
        component={Screens.JobSearchMessagingScreen}
      />

      <Tab.Screen
        name={Routes.JOB_SEARCH_STACK}
        component={Screens.JobSearchStack}
      />

      <Tab.Screen
        name={Routes.JOB_SEARCH_PROFILE}
        component={Screens.JobProfileScreen}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigation;
