import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from '../../../../components/Button/Button';
import { navigate } from '../../../../utils/NavigationUtil';
import { Routes } from '../../../../constants/Routes';
import { SafeAreaView } from 'react-native-safe-area-context';

const SelectUser: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '600', color: 'black' }}>
          What are you looking for
        </Text>
      </View>

      <View>
        <Button
          title="Want to Hire Candidate"
          onPress={() => {
            navigate(Routes.JOB_POSTING_NAVIGATOR, {
              screen: Routes.SIGN_UP_FOR_COMPANY,
            });
          }}
          style={styles.hireButton}
          textStyle={{ fontSize: 18, color: 'white', fontWeight: '400' }}
        />

        <Button
          title="Want to Get Job"
          onPress={() => {
            navigate(Routes.JOB_SEARCHING_NAVIGATOR, {
              screen: Routes.JOB_SEARCH_SIGN_UP,
            });
          }}
          style={styles.getJob}
          textStyle={{ fontSize: 18, color: 'black', fontWeight: '400' }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  hireButton: {
    width: 250,
    marginTop: 10,
    borderWidth: 0.5,
    backgroundColor: '#0096FF',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getJob: {
    backgroundColor: 'transparent',
    width: 250,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: '#0096FF',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
