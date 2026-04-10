import { View, Text, FlatList } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import CustomSafeAreaView from '../../../components/SafeAreaView/SafeAreaView';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';

const JobSeachMessagingScreen: FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userId = auth().currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = firestore()
      .collection('SavedJobs')
      .where('userId', '==', userId)
      .onSnapshot(async snapshot => {
        const jobsArray: any[] = [];

        for (const documentSnapshot of snapshot.docs) {
          const savedJob = documentSnapshot.data();

          const jobDoc = await firestore()
            .collection('Jobs')
            .doc(savedJob.jobId)
            .get();

          if (jobDoc.exists()) {
            jobsArray.push({
              id: jobDoc.id,
              ...jobDoc.data(),
            });
          }
        }

        setJobs(jobsArray);
        setIsLoading(false);
      });

    return unsubscribe;
  }, [userId]);

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.company}</Text>
        <Text style={styles.text}>{item.packageSalary}</Text>
      </View>
    );
  };

  return (
    <CustomSafeAreaView>
      {isLoading ? (
        <Text style={{ textAlign: 'center', marginTop: 30 }}>Loading...</Text>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.title}>No Saved Jobs</Text>
            </View>
          )}
        />
      )}
    </CustomSafeAreaView>
  );
};

export default JobSeachMessagingScreen;
