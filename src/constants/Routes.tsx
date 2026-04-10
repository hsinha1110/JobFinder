export const Routes = {
  SPLASH: 'Splash',
  JOB_POSTING_NAVIGATOR: 'JobPostingNavigator',
  JOB_SEARCHING_NAVIGATOR: 'JobSearchingNavigator',
  SELECT_USER: 'SelectUser',
  LOGIN_FOR_COMPANY: 'LoginForCompany',
  SIGN_UP_FOR_COMPANY: 'SignUpForCompany',
  HOME: 'Home',
  SEARCH: 'Search',
  MESSAGING: 'Messaging',
  POST: 'Post',
  PROFILE: 'Profile',
  JOB_SEARCH_DRAWER: 'JobSearchDrawer',
  JOB_SEARCH_HOME: 'JobSearchHome',
  JOB_SEARCH_MESSAGING: 'JobSearchMessaging',
  JOB_SEARCH_PROFILE: 'JobSearchProfile',
  JOB_SEARCH_SEARCH: 'JobSearch',
  JOB_SEARCH_LOGIN: 'JobSearchLogin',
  JOB_SEARCH_SIGN_UP: 'JobSearchSignUp',
  LOGIN_FOR_SEARCH: 'LoginForSearch',
  SIGN_UP_FOR_SEARCH: 'SignUpForSearch',
  JOB_DETAILS_SCREEN: 'JobDetailsScreen',
  JOB_SEARCH_STACK: 'JobSearchStack',
} as const;

export type RouteKeys = keyof typeof Routes;
export type RouteValues = (typeof Routes)[RouteKeys];
