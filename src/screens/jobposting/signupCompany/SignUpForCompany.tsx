import React, { FC, useState } from 'react';
import { ScrollView } from 'react-native';
import CustomSafeAreaView from '../../../components/SafeAreaView/SafeAreaView';
import CustomText from '../../../components/Text/CustomText';
import Button from '../../../components/Button/Button';
import { isValidEmail } from '../../../utils/ValidationUtil';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Colors } from '../../../constants/Colors';
import { goBack, navigate } from '../../../utils/NavigationUtil';
import Loader from '../../../components/Loader/Loader';
import { Modal } from 'react-native';
import { Routes } from '../../../constants/Routes';
import CustomInput from '../../../components/Input/input/CustomInput';

const SignUpForCompany: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactError, setContactError] = useState('');
  const [companyError, setCompanyError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = () => {
    let valid = true;

    setNameError('');
    setEmailError('');
    setContactError('');
    setCompanyError('');
    setAddressError('');
    setPasswordError('');

    if (!name.trim()) {
      setNameError('Name is required');
      valid = false;
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Enter valid email');
      valid = false;
    }

    if (!contact.trim()) {
      setContactError('Contact is required');
      valid = false;
    } else if (contact.length < 10) {
      setContactError('Enter valid phone number');
      valid = false;
    }

    if (!company.trim()) {
      setCompanyError('Company name is required');
      valid = false;
    }

    if (!address.trim()) {
      setAddressError('Address is required');
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be 6 characters');
      valid = false;
    }

    return valid;
  };

  const handleSignup = async (): Promise<void> => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email.trim(),
        password,
      );

      const user = userCredential.user;

      await firestore().collection('Users').doc(user.uid).set({
        name: name.trim(),
        email: email.trim(),
        contact: contact.trim(),
        company: company.trim(),
        address: address.trim(),
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      console.log('User registered successfully!');
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);

      console.log('Signup Error:', error.message);

      if (error.code === 'auth/email-already-in-use') {
        setEmailError('Email already in use');
      } else if (error.code === 'auth/invalid-email') {
        setEmailError('Invalid email');
      } else if (error.code === 'auth/weak-password') {
        setPasswordError('Weak password');
      }
    }
  };

  const handleLogin = () => {
    navigate(Routes.JOB_POSTING_NAVIGATOR, {
      screen: Routes.LOGIN_FOR_COMPANY,
    });
  };
  return (
    <CustomSafeAreaView style={{ flex: 1, padding: 20 }}>
      <Modal visible={isLoading} transparent animationType="fade">
        <Loader visible={isLoading} />
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomText variant="h2" style={{ marginBottom: 30 }}>
          Create Account
        </CustomText>

        <CustomInput
          label="Name"
          placeholder="Enter name"
          value={name}
          onChangeText={text => {
            setName(text);
            if (nameError) setNameError('');
          }}
          leftIcon="person-outline"
          error={nameError}
          containerStyle={{ marginBottom: 15 }}
        />

        <CustomInput
          label="Email"
          placeholder="Enter email"
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (emailError) setEmailError('');
          }}
          keyboardType="email-address"
          leftIcon="mail-outline"
          error={emailError}
          containerStyle={{ marginBottom: 15 }}
        />

        <CustomInput
          label="Contact"
          placeholder="Enter contact"
          value={contact}
          onChangeText={text => {
            setContact(text);
            if (contactError) setContactError('');
          }}
          keyboardType="phone-pad"
          leftIcon="call-outline"
          error={contactError}
          containerStyle={{ marginBottom: 15 }}
        />

        <CustomInput
          label="Company Name"
          placeholder="Enter company name"
          value={company}
          onChangeText={text => {
            setCompany(text);
            if (companyError) setCompanyError('');
          }}
          leftIcon="business-outline"
          error={companyError}
          containerStyle={{ marginBottom: 15 }}
        />

        <CustomInput
          label="Address"
          placeholder="Enter address"
          value={address}
          onChangeText={text => {
            setAddress(text);
            if (addressError) setAddressError('');
          }}
          leftIcon="location-outline"
          error={addressError}
          containerStyle={{ marginBottom: 15 }}
        />

        <CustomInput
          label="Password"
          placeholder="Enter password"
          value={password}
          onChangeText={text => {
            setPassword(text);
            if (passwordError) setPasswordError('');
          }}
          secureTextEntry
          leftIcon="lock-closed-outline"
          error={passwordError}
          containerStyle={{ marginBottom: 25 }}
        />

        <Button
          title="Sign Up"
          onPress={handleSignup}
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: '#0096FF',
          }}
          textStyle={{
            color: Colors.primary_black,
            fontWeight: 'bold',
            fontSize: 18,
          }}
        />
        <Button
          title="Login"
          onPress={handleLogin}
          style={{
            width: '100%',
            backgroundColor: '#0096FF',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: Colors.primary_black,
            marginVertical: 10,
          }}
          textStyle={{
            color: Colors.primary_white,
            fontWeight: 'bold',
            fontSize: 18,
          }}
        />
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default SignUpForCompany;
