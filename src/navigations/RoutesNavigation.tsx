import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../utils/NavigationUtil';
import RootNavigation from './RootNavigation';
 
const RoutesNavigation = () => {
  return (
      <NavigationContainer ref={navigationRef}>
        <RootNavigation />
      </NavigationContainer>
   );
};

export default RoutesNavigation;