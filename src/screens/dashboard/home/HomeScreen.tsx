import React, { FC, useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CustomSafeAreaView from '../../../components/SafeAreaView/SafeAreaView';
import { Job } from '../../../types';
import styles from './styles';
import Button from '../../../components/Button/Button';
import { Colors } from '../../../constants/Colors';
import { navigate } from '../../../utils/NavigationUtil';
import { Routes } from '../../../constants/Routes';
import ShimmerJobCard from '../../../components/ShimmerJobCard/ShimmerJobCard';

const HomeScreen: FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      });

    return () => subscriber();
  }, []);

  const handleEdit = (item: Job) => {
    navigate(Routes.POST, { item });
  };
  const handleDelete = (id: string) => {
    Alert.alert('Delete Job', 'Are you sure you want to delete this job?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setIsLoading(true);

          await firestore().collection('Jobs').doc(id).delete();

          setIsLoading(false);
        },
      },
    ]);
  };
  return (
    <CustomSafeAreaView style={styles.container}>
      {isLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => <ShimmerJobCard />}
        />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.description}</Text>
                <Text style={styles.text}>{item.experience}</Text>
                <Text style={styles.text}>{item.packageSalary}</Text>
                <Text style={styles.text}>{item.company}</Text>
                <Text style={styles.text}>{item.skill}</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    title="Edit"
                    onPress={() => handleEdit(item)}
                    style={{
                      width: '45%',
                      backgroundColor: 'transparent',
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: Colors.primary_gray,
                    }}
                    textStyle={{
                      color: Colors.primary_black,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}
                  />

                  <Button
                    title="Delete"
                    onPress={() => handleDelete(item.id)}
                    style={{
                      width: '45%',
                      backgroundColor: 'transparent',
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                      borderRadius: 10,
                      borderWidth: 0.5,
                      borderColor: Colors.primary_red,
                    }}
                    textStyle={{
                      color: Colors.primary_red,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        />
      )}
    </CustomSafeAreaView>
  );
};

export default HomeScreen;
