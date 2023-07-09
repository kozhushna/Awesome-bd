import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import { selectPosts } from '../Redux/selectors';
import { getAllPosts } from '../Services/posts-service';
import { addPost } from '../Redux/postsActions';
import { useDispatch } from 'react-redux';

const PUBLICATIONS = [
  {
    id: '1',
    image: require('../Images/Forest.jpg'),
    title: 'Ліс',
    comments: '8',
    likes: '153',
    location: "Ivano-Frankivs'k Region, Ukraine",
    latitude: 48.9215,
    longitude: 24.70972,
  },
  {
    id: '2',
    image: require('../Images/Sea.jpg'),
    title: 'Захід на Чорному морі',
    comments: '3',
    likes: '200',
    location: 'Ukraine',
    latitude: 46.482952,
    longitude: 30.712481,
  },
  {
    id: '3',
    image: require('../Images/Home.jpg'),
    title: 'Старий будиночок у Венеції',
    comments: '50',
    likes: '200',
    location: 'Italy',
    latitude: 45.438759,
    longitude: 12.327145,
  },
];

const PostsScreen = ({ route }) => {
  // const [publications, setPublications] = useState(PUBLICATIONS);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoggedIn, user } = useAuth();
  const publications = useSelector(selectPosts);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
      return;
    }
    (async () => {
      if (publications.length === 0) {
        const posts = await getAllPosts(user.id);
        dispatch(addPost(posts));
      }
    })();
  }, [isLoggedIn]);

  const renderItem = (item) => (
    <View style={styles.itemContainer}>
      {item.image && <Image source={item.image} style={styles.image} />}
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.panelHolder}>
        <View style={styles.activitiesHolder}>
          <View style={styles.commentsHolder}>
            <TouchableOpacity
              title="Location"
              onPress={() =>
                navigation.navigate('Comments', {
                  id: item.id,
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
      image: '',
      comments: entity.comments.length,
      likes: 0,
      place: entity.place,
      latitude: entity.latitude,
      longitude: entity.longitude,
    };
  };

  const getItemCount = (_data) => publications.length;

  const avatar = user?.photoURL
    ? {
        uri: user?.photoURL,
      }
    : UserImage;
  console.log(avatar);

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
