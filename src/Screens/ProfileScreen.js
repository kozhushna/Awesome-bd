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
import { Feather } from '@expo/vector-icons';
import FormContainer from '../Components/FormContainer';
import AvatarImageHolder from '../Components/AvatarImageHolder';
import Message from '../Icons/Message.png';
import { getUserPosts } from '../Services/posts-service';
import { useAuth } from '../Redux/useAuth';

const PUBLICATIONS = [
  {
    id: '1',
    image: require('../Images/Forest.jpg'),
    title: 'Ліс',
    comments: '8',
    likes: '153',
    location: 'Ukraine',
  },
  {
    id: '2',
    image: require('../Images/Sea.jpg'),
    title: 'Захід на Чорному морі',
    comments: '3',
    likes: '200',
    location: 'Ukraine',
  },
  {
    id: '3',
    image: require('../Images/Home.jpg'),
    title: 'Старий будиночок у Венеції',
    comments: '50',
    likes: '200',
    location: 'Italy',
  },
];

const ProfileScreen = () => {
  const [publications, setPublications] = useState([]);
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
      return;
    }
    (async () => {
      if (publications.length === 0) {
        const posts = await getUserPosts(user.id);
        setPublications(posts);
      }
    })();
  }, [isLoggedIn]);

  const renderItem = (item) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.panelHolder}>
        <View style={styles.activitiesHolder}>
          <View style={styles.commentsHolder}>
            <Image source={Message} />

            <Text style={styles.text}>{item.comments}</Text>
          </View>
          <View style={styles.likesHolder}>
            <AntDesign name="like2" size={24} color="#FF6C00" />
            <Text style={styles.text}>{item.likes}</Text>
          </View>
        </View>
        <View style={styles.locationHolder}>
          <AntDesign name="enviromento" size={24} color="#BDBDBD" />
          <TouchableOpacity
            title="Log Out"
            onPress={() => navigation.navigate('Map')}
            color="white"
          >
            <Text style={[styles.text, styles.underline]}>{item.location}</Text>
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
      image: entity.image,
      comments: entity.comments,
      likes: entity.likes,
      location: entity.place,
    };
  };

  const getItemCount = (_data) => publications.length;
  const navigation = useNavigation();

  return (
    <FormContainer>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          title="Log Out"
          onPress={() => navigation.navigate('Login')}
          color="white"
        >
          <View style={styles.buttonContainer}>
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={styles.logOutButton}
            />
          </View>
        </TouchableOpacity>

        <AvatarImageHolder />

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
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 103,
    minHeight: 600,
    paddingBottom: 45,
    paddingTop: 92,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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

  likesHolder: {
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

  button: {
    position: 'absolute',
    top: 23,
    right: 0,
    width: 25,
    height: 25,
    marginRight: 10,
  },

  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
