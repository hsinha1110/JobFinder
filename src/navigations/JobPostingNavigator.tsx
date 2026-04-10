import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from '../screens';
import { JobPostingStackParamList } from '../types';
import BottomNavigation from './BottomNavigation';
import { Routes } from '../constants/Routes';

const Stack = createNativeStackNavigator<JobPostingStackParamList>();
const JobPostingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.HOME} component={BottomNavigation} />
      <Stack.Screen name={Routes.POST} component={Screens.PostScreen} />
      <Stack.Screen name={Routes.SELECT_USER} component={Screens.SelectUser} />
      <Stack.Screen
        name={Routes.LOGIN_FOR_COMPANY}
        component={Screens.LoginForCompany}
      />
      <Stack.Screen
        name={Routes.SIGN_UP_FOR_COMPANY}
        component={Screens.SignUpForCompany}
      />
    </Stack.Navigator>
  );
};

export default JobPostingNavigator;
