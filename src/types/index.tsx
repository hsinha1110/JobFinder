import { StyleProp } from 'react-native';
import { Routes } from '../constants/Routes';
import { TextStyle, ViewStyle } from 'react-native-size-matters';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type JobPostingStackParamList = {
  [Routes.SPLASH]: undefined;
  [Routes.SELECT_USER]: undefined;
  [Routes.LOGIN_FOR_COMPANY]: undefined;
  [Routes.SIGN_UP_FOR_COMPANY]: undefined;
  [Routes.HOME]: undefined;
  [Routes.POST]: { item?: Job };
};
export type JobSearchingStackParamList = {
  [Routes.JOB_SEARCH_STACK]: undefined;
  [Routes.JOB_SEARCH_DRAWER]: undefined;
  [Routes.JOB_SEARCH_HOME]: undefined;
  [Routes.JOB_SEARCH_MESSAGING]: undefined;
  [Routes.JOB_SEARCH_SEARCH]: undefined;
  [Routes.JOB_SEARCH_PROFILE]: undefined;
  [Routes.JOB_SEARCH_LOGIN]: undefined;
  [Routes.JOB_SEARCH_SIGN_UP]: undefined;

  [Routes.JOB_DETAILS_SCREEN]: { item: Job };
};
export interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
export type RootStackParamList = {
  [Routes.JOB_POSTING_NAVIGATOR]: NavigatorScreenParams<JobPostingStackParamList>;
  [Routes.JOB_SEARCHING_NAVIGATOR]: NavigatorScreenParams<JobSearchingStackParamList>;
  [Routes.HOME]: undefined;
  [Routes.SELECT_USER]: undefined;
  [Routes.POST]: { item?: Job };
  [Routes.JOB_SEARCH_DRAWER]: NavigatorScreenParams<DrawerParamList>;
  [Routes.JOB_DETAILS_SCREEN]: { item: Job };
};

export type BottomTabParamList = {
  Home: undefined;
  Messaging: undefined;
  Post: { item?: Job };
  Search: undefined;
  Profile: undefined;
};
export type BottomTabNavigationParamsList = {
  JobSearchHome: undefined;
  JobSearchMessaging: undefined;
  JobSearchStack: undefined;
  JobSearchProfile: undefined;
};
export interface Props {
  data: string[];
  placeholder: string;
  value: string;
  onSelect: (item: string) => void;
  error: string;
}
export interface Job {
  id: string;
  title?: string;
  description?: string;
  experience?: string;
  packageSalary?: string;
  company?: string;
  skill?: string;
}
export interface LoaderProps {
  visible?: boolean;
}
export type DrawerParamList = {
  JobSearchHome: undefined;
  BookMark: undefined;
  Rules: undefined;
  Score: undefined;
  Settings: undefined;
  Profile: undefined;
};
export type NavigationProp = NativeStackNavigationProp<
  JobSearchingStackParamList,
  typeof Routes.JOB_SEARCH_SEARCH
>;
