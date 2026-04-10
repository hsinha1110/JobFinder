import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawer/CustomDrawerContent';
import BottomTabNavigation from './BottomTabNavigation';
import { DrawerParamList } from '../types';
import { Routes } from '../constants/Routes';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={Routes.JOB_SEARCH_HOME}
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name={Routes.JOB_SEARCH_HOME}
        component={BottomTabNavigation}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
