export const routes = {
  // Auth
  SPLASH: 'Splash',
  ONBOARDING: 'Onboarding',
  LOGIN: 'Login',
  REGISTER: 'Register',

  // App
  FEED: 'Feed',
  NEWS_DETAIL: 'NewsDetail',
  ADD_STORY: 'AddStory',
  SOCIAL: 'Social',
  FOLLOWERS: 'Followers',
  PROFILE: 'Profile',
  EDIT_PROFILE: 'EditProfile',
  NOTIFICATIONS: 'Notifications',
} as const;

export type RouteKey = keyof typeof routes;
export type RouteName = (typeof routes)[RouteKey];
