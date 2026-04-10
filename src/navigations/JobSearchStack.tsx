import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../constants/Routes';
import * as Screens from '../screens';

const Stack = createNativeStackNavigator();

const JobSearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Routes.JOB_SEARCH_SEARCH}
        component={Screens.JobSearchingScreen}
      />

      <Stack.Screen
        name={Routes.JOB_DETAILS_SCREEN}
        component={Screens.JobDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default JobSearchStack;
