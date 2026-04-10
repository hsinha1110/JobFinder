import React, { FC, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import CustomSafeAreaView from '../../../components/SafeAreaView/SafeAreaView';
import CustomText from '../../../components/Text/CustomText';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../../components/Loader/Loader';
import firestore from '@react-native-firebase/firestore';
import { Job } from '../../../types';
import UpdateProfileModal from '../../../components/Modal/UpdateProfileModal';
import { navigate } from '../../../utils/NavigationUtil';
import { Routes } from '../../../constants/Routes';

const ProfileScreen: FC = () => {
  const [name, setName] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Jobs')
      .onSnapshot(querySnapshot => {
        const jobsArray: Job[] = [];

        querySnapshot.forEach(documentSnapshot => {
          jobsArray.push({
            id: documentSnapshot.id,
            ...(documentSnapshot.data() as Omit<Job, 'id'>),
          });
        });

        setJobs(jobsArray);
      });

    return () => subscriber();
  }, []);

  useEffect(() => {
    const user = auth().currentUser;

    if (user) {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists()) {
            const userData = documentSnapshot.data();
            setName(userData?.name);
          }
        })
        .catch(error => {
          console.log('User fetch error', error);
        });
    }
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            setIsLoading(true);
            await auth().signOut();
            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
            console.log('Logout error', error);
          }
        },
      },
    ]);
  };

  const handleMyJob = () => {
    navigate(Routes.HOME);
  };

  return (
    <CustomSafeAreaView className="flex-1 bg-white items-center">
      <Modal visible={isLoading} transparent animationType="fade">
        <Loader />
      </Modal>

      <View className="mt-10 items-center">
        <CustomText className="text-xl font-bold mt-3">{name}</CustomText>
        <TouchableOpacity onPress={() => setUpdateModalVisible(true)}>
          <CustomText className="text-blue-500 mt-1">Update Profile</CustomText>
        </TouchableOpacity>
      </View>

      <View className="w-full mt-10 px-6">
        <TouchableOpacity
          onPress={handleMyJob}
          className="flex-row items-center py-4 border-b border-gray-200"
        >
          <Icon name="briefcase-outline" size={20} color="#000" />
          <CustomText className="ml-4">My Jobs ({jobs.length})</CustomText>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200">
          <Icon name="call-outline" size={20} color="#000" />
          <CustomText className="ml-4">Contact Us</CustomText>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200">
          <Icon name="color-palette-outline" size={20} color="#000" />
          <CustomText className="ml-4">App Theme</CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center py-4 border-b border-gray-200"
        >
          <Icon name="log-out-outline" size={20} color="red" />
          <CustomText className="ml-4 text-red-500">Logout</CustomText>
        </TouchableOpacity>
      </View>
      <UpdateProfileModal
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
      />
    </CustomSafeAreaView>
  );
};

export default ProfileScreen;