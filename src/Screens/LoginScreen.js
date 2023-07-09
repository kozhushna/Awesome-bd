import React, { useEffect } from 'react';
import { useAuth } from '../Redux/useAuth';
import { useNavigation } from '@react-navigation/native';
import FormContainer from '../Components/FormContainer';
import LoginForm from '../Components/LoginForm';

const LoginScreen = () => {
  // const navigation = useNavigation();
  // const { isLoggedIn } = useAuth();
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigation.navigate('Home');
  //     return;
  //   }
  // }, []);
  return (
    <FormContainer>
      <LoginForm />
    </FormContainer>
  );
};

export default LoginScreen;
