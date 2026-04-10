import React, { useEffect, useState } from 'react';
import { View, Image, Alert, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore';

import CustomText from '../Text/CustomText';
import styles from './CustomDrawerStyles';
import { Colors } from '../../constants/Colors';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const { navigation, state } = props;

  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const currentRoute = state.routeNames[state.index];

  useEffect(() => {
    const loadUser = async () => {
      try {
        const app = getApp();
        const auth = getAuth(app);
        const db = getFirestore(app);

        const currentUser = auth.currentUser;

        if (!currentUser) {
          setUser(null);
          return;
        }

        setUser(currentUser);
        setUserEmail(currentUser.email ?? '');

        const userRef = doc(db, 'Users', currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserName(data?.name || 'User');
        }
      } catch (error) {
        console.log('User fetch error:', error);
      }
    };

    loadUser();
  }, []);

  const renderDrawerItem = (
    label: string,
    routeName: string,
    iconName: string,
  ) => {
    const focused = currentRoute === routeName;

    return (
      <DrawerItem
        label={label}
        onPress={() => navigation.navigate(routeName as never)}
        icon={({ size }) => (
          <Icon
            name={iconName}
            size={size}
            color={focused ? Colors.primary_white : Colors.primary_black}
          />
        )}
      />
    );
  };

  const onLogout = () => {
    Alert.alert('Logout', 'Do you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: async () => {
          const auth = getAuth(getApp());
          await auth.signOut();
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        {/* USER NOT LOGIN */}

        {!user ? (
          <View style={styles.guestContainer}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
              }}
              style={styles.profileIcon}
            />

            <CustomText style={styles.title}>Build Your Profile</CustomText>

            <CustomText style={styles.subtitle}>
              Job Opportunities waiting for you at FindMyJob
            </CustomText>

            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => navigation.navigate('Login')}
              >
                <CustomText style={styles.loginText}>Login</CustomText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.registerBtn}
                onPress={() => navigation.navigate('Register')}
              >
                <CustomText style={styles.registerText}>Register</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            {/* USER LOGIN */}

            <View style={styles.profileContainer}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                }}
                style={styles.profileImage}
              />

              <CustomText style={styles.userName}>{userName}</CustomText>

              <CustomText style={styles.userEmail}>{userEmail}</CustomText>
            </View>

            <DrawerItem
              label="Logout"
              onPress={onLogout}
              icon={({ size }) => (
                <Icon name="logout" size={size} color={Colors.primary_black} />
              )}
            />
          </>
        )}
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerContent;
