import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Feed: undefined;
  Social: undefined;
  Add: undefined;
  Alerts: undefined;
  Me: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<MainTabParamList>;
  NewsDetail: { newsId: string };
  Followers: { userId: string };
  EditProfile: undefined;
};
