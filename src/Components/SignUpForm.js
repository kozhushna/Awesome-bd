import React, { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { registerDB } from '../Services/auth-service';
import { storeUser } from '../Redux/userActions';

import AvatarHolder from './AvatarHolder';

const SignUpForm = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordShowed, setIsPasswordShowed] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleInputLoginFocus = () => {
    setIsLoginFocused(true);
  };

  const handleInputLoginBlur = () => {
    setIsLoginFocused(false);
  };

  const handleInputEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleInputEmailBlur = () => {
    setIsEmailFocused(false);
  };

  const handleInputPasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handleInputPasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handlePasswordPress = (state) => {
    setIsPasswordShowed(state);
  };

  const createUser = async () => {
    if (!login || !email || !password) {
      Alert.alert('Please fill all fields.');
    }
    try {
      const user = await registerDB(email, password, login);
      console.log(user);

      dispatch(storeUser(user));
      setEmail('');
      setLogin('');
      setPassword('');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-75}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              style={[styles.input, isLoginFocused && styles.inputFocused]}
              placeholder="Логін"
              onChangeText={setLogin}
              value={login}
              onFocus={handleInputLoginFocus}
              onBlur={handleInputLoginBlur}
            />
            <TextInput
              style={[styles.input, isEmailFocused && styles.inputFocused]}
              placeholder="Адреса електронної пошти"
              onChangeText={setEmail}
              value={email}
              onFocus={handleInputEmailFocus}
              onBlur={handleInputEmailBlur}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.inputPassword,
                  isPasswordFocused && styles.inputFocused,
                ]}
                placeholder="Пароль"
                secureTextEntry={isPasswordShowed}
                onChangeText={setPassword}
                value={password}
                onFocus={handleInputPasswordFocus}
                onBlur={handleInputPasswordBlur}
              />

              <TouchableHighlight
                style={styles.linkShowPassword}
                onPressIn={() => handlePasswordPress(false)}
                onPressOut={() => handlePasswordPress(true)}
              >
                <Text style={styles.linkText}>Показати</Text>
              </TouchableHighlight>
            </View>

            <Pressable
              title="Sign Up"
              style={styles.button}
              onPress={createUser}
            >
              <Text style={styles.buttonText}>Зареєструватись</Text>
            </Pressable>
            <View style={styles.holder}>
              <Text style={styles.linkText}>Вже є акаунт?</Text>
              <TouchableHighlight onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Увійти</Text>
              </TouchableHighlight>
            </View>
          </View>
          <AvatarHolder />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 560,
    paddingBottom: 45,
    paddingTop: 92,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  title: {
    marginBottom: 32,
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 30,
    textAlign: 'center',
    color: '#212121',
  },

  input: {
    height: 50,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },

  inputPassword: {
    marginBottom: 0,
  },

  inputFocused: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF6C00',
  },

  button: {
    paddingVertical: 15,
    height: 50,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    marginBottom: 16,
  },

  buttonText: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },

  holder: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },

  linkText: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 16,
    color: '#1B4371',
  },

  linkShowPassword: {
    position: 'absolute',
    top: 16,
    right: 16,
  },

  passwordContainer: {
    marginBottom: 43,
  },
});

export default SignUpForm;
