import React, { FC, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Routes } from '../../../../constants/Routes';
import { resetAndNavigate } from '../../../../utils/NavigationUtil';

const SplashScreen: FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const user = auth().currentUser;

      if (user) {
        // User already logged in
        resetAndNavigate(Routes.JOB_POSTING_NAVIGATOR, {
          screen: Routes.SELECT_USER,
        });
      } else {
        // User not logged in
        resetAndNavigate(Routes.JOB_POSTING_NAVIGATOR, {
          screen: Routes.SELECT_USER,
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Job Finder</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0096FF',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
});
