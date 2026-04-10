import React, { FC, useState, useEffect } from 'react';
import { View, Modal, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomText from '../Text/CustomText';
import { Colors } from '../../constants/Colors';
import Button from '../Button/Button';
import styles from './styles';
import Loader from '../Loader/Loader';
import CustomInput from '../Input/input/CustomInput';
interface Props {
  visible: boolean;
  onClose: () => void;
}

const UpdateProfileModal: FC<Props> = ({ visible, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    const user = auth().currentUser;

    if (!user) return;

    const subscriber = firestore()
      .collection('Users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.data();

        setName(data?.name || '');
        setEmail(data?.email || '');
        setPhone(data?.phone || '');
      });

    return () => subscriber();
  }, []);

  const handleUpdate = async () => {
    const user = auth().currentUser;

    if (!user) return;

    let valid = true;

    if (!name) {
      setNameError('Name is required');
      valid = false;
    }

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    }

    if (!phone) {
      setPhoneError('Phone is required');
      valid = false;
    }

    if (!valid) return;

    try {
      setIsLoading(true);

      await firestore().collection('Users').doc(user.uid).update({
        name,
        email,
        phone,
      });

      setIsLoading(false);

      Alert.alert('Success', 'Profile Updated');
      onClose();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <Modal visible={visible} transparent animationType="slide">
      {isLoading && <Loader />}
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-[90%] p-5 rounded-xl">
          <CustomText className="text-lg font-bold mb-4">
            Update Profile
          </CustomText>

          <CustomInput
            placeholder="Name"
            leftIcon="person-outline"
            value={name}
            error={nameError}
            onChangeText={(text: string) => {
              setName(text);
              if (nameError) setNameError('');
            }}
            containerStyle={styles.inputStyle}
          />

          <CustomInput
            placeholder="Email"
            keyboardType="email-address"
            leftIcon="mail-outline"
            value={email}
            error={emailError}
            onChangeText={(text: string) => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
            containerStyle={styles.inputStyle}
          />

          <CustomInput
            placeholder="Phone"
            keyboardType="number-pad"
            leftIcon="call-outline"
            value={phone}
            error={phoneError}
            onChangeText={(text: string) => {
              setPhone(text);
              if (phoneError) setPhoneError('');
            }}
            containerStyle={styles.inputStyle}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button
              title="Cancel"
              onPress={onClose}
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
              title="Update"
              onPress={handleUpdate}
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
    </Modal>
  );
};

export default UpdateProfileModal;
