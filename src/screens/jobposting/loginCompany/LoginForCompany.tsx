import React, { FC, useState } from 'react';
import CustomSafeAreaView from '../../../components/SafeAreaView/SafeAreaView';
 import Button from '../../../components/Button/Button';
import CustomText from '../../../components/Text/CustomText';
import { Colors } from '../../../constants/Colors';
import { navigate, resetAndNavigate } from '../../../utils/NavigationUtil';
import { Routes } from '../../../constants/Routes';
import styles from './styles';
import { isValidEmail } from '../../../utils/ValidationUtil';
import auth from '@react-native-firebase/auth';
import { Modal } from 'react-native';
import Loader from '../../../components/Loader/Loader';
import CustomInput from '../../../components/Input/input/CustomInput';

const LoginForCompany: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  
  const validate = (): boolean => {
    let valid = true;

    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Enter valid email');
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    }

    return valid;
  };

  const handleLogin = async (): Promise<void> => {
    if (!validate()) return;

    setIsLoading(true); 

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email.trim(),
        password,
      );

      console.log('Login User', userCredential.user);

      setIsLoading(false);

      resetAndNavigate(Routes.JOB_POSTING_NAVIGATOR, { screen: Routes.HOME });
    } catch (error: any) {
      console.log('Login error:', error);

      setIsLoading(false);

      if (error.code === 'auth/user-not-found') {
        setEmailError('User not found');
      } else if (error.code === 'auth/wrong-password') {
        setPasswordError('Wrong password');
      } else if (error.code === 'auth/invalid-email') {
        setEmailError('Invalid email');
      }
    }
  };

  const handleSignUp = () => {
    navigate(Routes.JOB_POSTING_NAVIGATOR, {
      screen: Routes.SIGN_UP_FOR_COMPANY,
    });
  };
  return (
    <CustomSafeAreaView
      style={{ flex: 1, padding: 20, justifyContent: 'center' }}
    >
      <CustomText variant="h2" style={{ marginBottom: 20 }}>
        Company Login
      </CustomText>
      {isLoading ? (
        <Modal>
          <Loader visible={isLoading} />
        </Modal>
      ) : null}
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
        placeholder="Password"
        secureTextEntry
        leftIcon="lock-closed-outline"
        value={password}
        error={passwordError}
        onChangeText={(text: string) => {
          setPassword(text);
          if (passwordError) setPasswordError('');
        }}
        containerStyle={styles.inputStyle}
      />

      <CustomText
        variant="h6"
        style={{
          color: Colors.primary_black,
          alignSelf: 'flex-end',
          marginVertical: 10,
        }}
      >
        Forgot Password ?
      </CustomText>

      <Button
        title="Login"
        onPress={handleLogin}
        style={{
          width: '100%',
          backgroundColor: '#0096FF',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        textStyle={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 18,
        }}
      />

      <Button
        title="Create Account"
        onPress={handleSignUp}
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          borderWidth: 0.5,
          borderColor: '#0096FF',
        }}
        textStyle={{
          color: Colors.primary_black,
          fontWeight: 'bold',
          fontSize: 18,
        }}
      />
    </CustomSafeAreaView>
  );
};

export default LoginForCompany;
