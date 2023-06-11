import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

const registerDB = async ({ email, password, displayName }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateUserProfile(displayName);
  return user;
};

const onPressLearnMore = async () => {
  try {
    // console.log('test');
    // const response = await axios.post(
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBgj6QFtQbAS60mxkQ8th5M12ztKMn29l4',
    //   {
    //     email: 'testuser@user.com',
    //     password: 'test12345',
    //     returnSecureToken: true,
    //   }
    // );

    // const { user } = await createUserWithEmailAndPassword(
    //   auth,
    //   'email@email.com',
    //   'q1w2e3r4'
    // );

    // console.log(user);
    //setData(json.movies);

    const querySnapshot = await getDocs(collection(db, 'posts'));
    console.log(3);
    querySnapshot.forEach((doc) => {
      console.log('1');

      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log('done');
    //setLoading(false);
  }
};

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        onPress={onPressLearnMore}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
