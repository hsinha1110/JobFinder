import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from '../screens';
import { JobSearchingStackParamList } from '../types';
import { Routes } from '../constants/Routes';

const Stack = createNativeStackNavigator<JobSearchingStackParamList>();

const JobSearchingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Routes.JOB_SEARCH_LOGIN}
        component={Screens.JobSearchLogin}
      />

      <Stack.Screen
        name={Routes.JOB_SEARCH_SIGN_UP}
        component={Screens.JobSearchSignUp}
      />

      <Stack.Screen
        name={Routes.JOB_SEARCH_STACK}
        component={Screens.JobSearchStack}
      />

      <Stack.Screen
        name={Routes.JOB_SEARCH_MESSAGING}
        component={Screens.JobSearchMessagingScreen}
      />

      <Stack.Screen
        name={Routes.JOB_SEARCH_PROFILE}
        component={Screens.JobProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default JobSearchingNavigator;
