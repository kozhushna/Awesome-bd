import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  VirtualizedList,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import UserImage from '../Images/User.png';
import MessageCircle from '../Icons/MessageCircle.png';
import { useAuth } from '../Redux/useAuth';
import { getAllPosts } from '../Services/posts-service';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const PostsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { isLoggedIn, user } = useAuth();
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
      return;
    }
    const ref = collection(db, 'posts');

    onSnapshot(
      ref,
      (data) => {
        const posts = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPublications(posts);
      },
      () => {}
    );
    (async () => {
      if (publications.length === 0) {
        const posts = await getAllPosts(user.id);
        setPublications(posts);
      }
    })();
  }, [isLoggedIn]);

  const renderItem = (item) => (
    <View style={styles.itemContainer}>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.panelHolder}>
        <View style={styles.activitiesHolder}>
          <View style={styles.commentsHolder}>
            <TouchableOpacity
              title="Location"
              onPress={() =>
                navigation.navigate('Comments', {
                  postId: item.id,
                  userId: item.userId,
                  image: item.image,
                })
              }
              color="white"
            >
              <Image source={MessageCircle} />
            </TouchableOpacity>

            <Text style={styles.text}>{item.comments}</Text>
          </View>
        </View>
        <View style={styles.locationHolder}>
          <AntDesign name="enviromento" size={24} color="#BDBDBD" />
          <TouchableOpacity
            title="Location"
            onPress={() =>
              navigation.navigate('Map', {
                latitude: item.latitude,
                longitude: item.longitude,
              })
            }
            color="white"
          >
            <Text style={[styles.text, styles.underline]}>{item.place}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const getItem = (_data, index) => {
    const entity = publications[index];
    return {
      id: entity.id,
      title: entity.name,
      image: entity.fotoUri,
      comments: entity.commentsCount ?? 0,
      place: entity.place,
      latitude: entity.latitude,
      longitude: entity.longitude,
      userId: entity.userId,
    };
  };

  const getItemCount = (_data) => publications?.length ?? 0;

  const avatar = user?.photoURL
    ? {
        uri: user?.photoURL,
      }
    : UserImage;

  return (
    <View style={styles.container}>
      <View style={styles.holder}>
        <Image source={avatar} style={{ width: 50, height: 50 }} />
        <View style={styles.textHolder}>
          <Text style={styles.caption}>{user.displayName}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      <SafeAreaView style={styles.mainContainer}>
        <VirtualizedList
          data={publications}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    height: '100%',
    paddingBottom: 32,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },

  holder: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
    marginLeft: 8,
  },

  textHolder: {
    flex: 1,
  },

  caption: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    color: '#212121',
  },

  email: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    color: 'rgba(33, 33, 33, 0.8)',
  },

  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemContainer: {
    paddingHorizontal: 8,
    marginBottom: 32,
  },
  image: {
    width: 343,
    height: 240,
    marginRight: 10,
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    marginVertical: 8,
  },

  panelHolder: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 12,
  },

  commentsHolder: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  locationHolder: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  activitiesHolder: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },

  text: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export default PostsScreen;
