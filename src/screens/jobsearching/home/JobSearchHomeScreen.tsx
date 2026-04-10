import React, { FC, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import CustomSafeAreaView from '../../../components/SafeAreaView/SafeAreaView';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import { Job } from '../../../types';
import ShimmerJobCard from '../../../components/ShimmerJobCard/ShimmerJobCard';

const JobSearchHomeScreen: FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userId = auth().currentUser?.uid;

  useEffect(() => {
    const subscriber = firestore()
      .collection('Jobs')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const jobsArray: Job[] = [];

        querySnapshot.forEach(documentSnapshot => {
          jobsArray.push({
            id: documentSnapshot.id,
            ...(documentSnapshot.data() as Omit<Job, 'id'>),
          });
        });

        setJobs(jobsArray);
        setIsLoading(false);
      });

    return () => subscriber();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = firestore()
      .collection('SavedJobs')
      .where('userId', '==', userId)
      .onSnapshot(snapshot => {
        const saved: string[] = [];

        snapshot.forEach(doc => {
          const data = doc.data();
          saved.push(data.jobId);
        });

        setSavedJobs(saved);
      });

    return () => unsubscribe();
  }, [userId]);

  const toggleSaveJob = async (jobId: string) => {
    const docId = `${userId}_${jobId}`;
    const ref = firestore().collection('SavedJobs').doc(docId);

    if (savedJobs.includes(jobId)) {
      await ref.delete();
    } else {
      await ref.set({
        userId,
        jobId,
      });
    }
  };

  const renderItem = ({ item }: { item: Job }) => {
    const isSaved = savedJobs.includes(item.id);

    return (
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>{item.title}</Text>

          <TouchableOpacity onPress={() => toggleSaveJob(item.id)}>
            <Icon
              name={isSaved ? 'star' : 'star-outline'}
              size={22}
              color={isSaved ? '#FFD700' : '#999'}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>{item.description}</Text>
        <Text style={styles.text}>{item.experience}</Text>
        <Text style={styles.text}>{item.packageSalary}</Text>
        <Text style={styles.text}>{item.company}</Text>
        <Text style={styles.text}>{item.skill}</Text>
      </View>
    );
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      {isLoading ? (
        <FlatList
          data={Array(5).fill(0)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => <ShimmerJobCard showButtons={false} />}
        />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          initialNumToRender={10}
          removeClippedSubviews
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Icon name="search-outline" size={40} color="#999" />
              <Text style={styles.emptyText}>No Jobs Found</Text>
            </View>
          )}
        />
      )}
    </CustomSafeAreaView>
  );
};

export default JobSearchHomeScreen;
