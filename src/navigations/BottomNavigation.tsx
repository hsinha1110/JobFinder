import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Screens from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import { Routes } from '../constants/Routes';
import { BottomTabParamList } from '../types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0096FF',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: { height: 60, paddingBottom: 5 },
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Messaging':
              iconName = 'chatbubble-outline';
              break;
            case 'Post':
              iconName = 'add-circle-outline';
              break;
            case 'Search':
              iconName = 'search-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={Routes.HOME} component={Screens.HomeScreen} />
      <Tab.Screen name={Routes.MESSAGING} component={Screens.MessagingScreen} />
      <Tab.Screen name={Routes.POST} component={Screens.PostScreen} />
      <Tab.Screen name={Routes.SEARCH} component={Screens.SearchScreen} />
      <Tab.Screen name={Routes.PROFILE} component={Screens.ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
