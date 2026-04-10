import React, { FC, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomSafeAreaView from '../../../components/SafeAreaView/SafeAreaView';
import Button from '../../../components/Button/Button';
import styles from './styles';

import auth from '@react-native-firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

const JobDetailsScreen: FC<any> = ({ route }) => {
  const { item } = route.params;

  const db = getFirestore();
  const userId = auth().currentUser?.uid;

  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  /**
   * Check Saved Job
   */
  useEffect(() => {
    const checkSaved = async () => {
      if (!userId) return;

      const ref = doc(db, 'SavedJobs', `${userId}_${item.id}`);
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        setSaved(true);
      }
    };

    checkSaved();
  }, []);

  /**
   * Check Applied Job
   */
  useEffect(() => {
    const checkApplied = async () => {
      if (!userId) return;

      const ref = doc(db, 'AppliedJobs', `${userId}_${item.id}`);
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        setApplied(true);
      }
    };

    checkApplied();
  }, []);

  /**
   * Save Job
   */
  const toggleSaveJob = async () => {
    try {
      const docId = `${userId}_${item.id}`;

      const ref = doc(db, 'SavedJobs', docId);

      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        await deleteDoc(ref);
        setSaved(false);
      } else {
        await setDoc(ref, {
          userId,
          jobId: item.id,
          title: item.title,
          company: item.company,
          savedAt: serverTimestamp(),
        });

        setSaved(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Apply Job
   */
  const applyJob = async () => {
    try {
      const docId = `${userId}_${item.id}`;

      const ref = doc(db, 'AppliedJobs', docId);

      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        Alert.alert('Already Applied', 'You already applied for this job');
        return;
      }

      await setDoc(ref, {
        userId,
        jobId: item.id,
        title: item.title,
        company: item.company,
        appliedAt: serverTimestamp(),
      });

      setApplied(true);

      Alert.alert('Success', 'Job applied successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.title}>{item?.title}</Text>

        <Text style={styles.company}>{item?.company}</Text>

        <View style={styles.section}>
          <Text style={styles.heading}>Salary</Text>
          <Text style={styles.text}>{item?.packageSalary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Experience</Text>
          <Text style={styles.text}>{item?.experience}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>
          <Text style={styles.text}>{item?.skill}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Job Description</Text>
          <Text style={styles.text}>{item?.description}</Text>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.starContainer} onPress={toggleSaveJob}>
          <Icon
            name={saved ? 'star' : 'star-outline'}
            size={24}
            color={saved ? '#FFD700' : '#333'}
          />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Button
            title={applied ? 'Applied' : 'Apply Job'}
            onPress={applyJob}
          />
        </View>
      </View>
    </CustomSafeAreaView>
  );
};

export default JobDetailsScreen;
