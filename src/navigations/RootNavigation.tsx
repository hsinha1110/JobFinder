import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import * as Screens from '../screens';
import { Routes } from '../constants/Routes';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const [user, setUser] = useState<any>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userAuth => {
      setUser(userAuth);
      if (initializing) setInitializing(false);
    });

    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* User Logged In */}
      {user ? (
        <Stack.Screen
          name={Routes.JOB_SEARCH_DRAWER}
          component={Screens.DrawerNavigator}
        />
      ) : (
        <>
          {/* Select User Screen */}
          <Stack.Screen
            name={Routes.SELECT_USER}
            component={Screens.SelectUser}
          />

          {/* Recruiter Flow */}
          <Stack.Screen
            name={Routes.JOB_POSTING_NAVIGATOR}
            component={Screens.JobPostingNavigator}
          />

          {/* Job Seeker Flow */}
          <Stack.Screen
            name={Routes.JOB_SEARCHING_NAVIGATOR}
            component={Screens.JobSearchingNavigator}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigation;
