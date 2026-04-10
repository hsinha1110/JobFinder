import React, { FC, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import CustomSafeAreaView from '../../../components/SafeAreaView/SafeAreaView';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomInput from '../../../components/Input/input/CustomInput';
import styles from './styles';
import ShimmerJobCard from '../../../components/ShimmerJobCard/ShimmerJobCard';
import { Routes } from '../../../constants/Routes';
import { navigate } from '../../../utils/NavigationUtil';

const JobSearchScreen: FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const userId = auth().currentUser?.uid;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Jobs')
      .onSnapshot(snapshot => {
        const jobList: any[] = [];

        snapshot.forEach(doc => {
          jobList.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setJobs(jobList);
        setFilteredJobs(jobList);
        setIsLoading(false);
      });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = firestore()
      .collection('SavedJobs')
      .where('userId', '==', userId)
      .onSnapshot(snapshot => {
        const saved: string[] = [];

        snapshot.forEach(doc => {
          saved.push(doc.data().jobId);
        });

        setSavedJobs(saved);
      });

    return unsubscribe;
  }, [userId]);

  const toggleSaveJob = async (jobId: string) => {
    const docId = `${userId}_${jobId}`;
    const ref = firestore().collection('SavedJobs').doc(docId);

    if (savedJobs.includes(jobId)) {
      await ref.delete();
    } else {
      await ref.set({ userId, jobId });
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);

    const filtered = jobs.filter(job =>
      job.title?.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredJobs(filtered);
  };

  const clearSearch = () => {
    setSearch('');
    setFilteredJobs(jobs);
  };

  const renderItem = ({ item }: any) => {
    const isSaved = savedJobs.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => {
          console.log('clicked');
          navigate(Routes.JOB_DETAILS_SCREEN, { item });
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>{item.title}</Text>

          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              toggleSaveJob(item.id);
            }}
          >
            <Icon
              name={isSaved ? 'star' : 'star-outline'}
              size={22}
              color={isSaved ? '#FFD700' : '#999'}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>{item.company}</Text>
        <Text style={styles.text}>{item.location}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <CustomInput
          placeholder="Search jobs..."
          value={search}
          onChangeText={handleSearch}
          leftIcon="search-outline"
        />

        {search.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
            <Icon name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {isLoading ? (
        <FlatList
          data={Array(5).fill(0)}
          keyExtractor={(_, i) => i.toString()}
          renderItem={() => <ShimmerJobCard showButtons={false} />}
        />
      ) : (
        <FlatList
          data={filteredJobs}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </CustomSafeAreaView>
  );
};

export default JobSearchScreen;
