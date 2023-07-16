import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  VirtualizedList,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import Sea from '../Images/Sea.jpg';
import { useAuth } from '../Redux/useAuth';
import { getPostComments, createComment } from '../Services/comments-service';

const CommentScreen = ({ route }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const { postId, userId, image } = route.params;
  const { isLoggedIn, user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
      return;
    }
    const q = query(
      collection(db, 'postscomments'),
      where('postId', '==', postId)
    );

    onSnapshot(
      q,
      (data) => {
        const result = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(result);
      },
      () => {}
    );
    (async () => {
      if (comments.length === 0) {
        const data = await getPostComments(postId);
        setComments(data);
      }
    })();
  }, [isLoggedIn]);

  const renderItem = (item, index) => (
    <View
      style={[
        styles.commentContainer,
        index % 2 === 0 ? styles.evenRow : styles.oddRow,
      ]}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.avatar} />
      ) : (
        <Image source={require('../Images/Avatar.png')} />
      )}
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
        <View
          style={[
            styles.textContainer,
            index % 2 === 0 ? styles.evenDate : styles.oddDate,
          ]}
        >
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
    </View>
  );

  const getFormatedDate = ({ seconds }) => {
    const date = new Date(seconds * 1000);
    return `${date.toDateString()} | ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const getItem = (_data, index) => {
    const entity = comments[index];
    return {
      id: entity.id,
      text: entity.text,
      image: entity.image,
      date: getFormatedDate(entity.createdDate),
    };
  };

  const getItemCount = (_data) => comments.length;
  const imageSource = image ? { uri: image } : Sea;

  const sendComment = async () => {
    if (!comment) {
      return;
    }
    const entry = {
      postId,
      text: comment,
      userId: user.id,
      image: user.photoURL,
    };

    //console.log(entry);
    const result = await createComment(entry);
    // console.log(result);
    setComment('');
  };

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <SafeAreaView style={styles.mainContainer}>
        <VirtualizedList
          data={comments}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item) => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      </SafeAreaView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Коментувати..."
          value={comment}
          onChangeText={setComment}
        />

        <TouchableHighlight style={styles.button} onPress={sendComment}>
          <AntDesign name="arrowup" size={14} color="#FFFFFF" />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: 32,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },

  commentContainer: {
    marginBottom: 32,
    width: 343,

    alignItems: 'flex-start',
    gap: 16,
  },

  evenRow: {
    flexDirection: 'row',
  },

  oddRow: {
    flexDirection: 'row-reverse',
  },

  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {
    flex: 0,
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 'auto',
    gap: 8,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 6,
  },

  textContainer: {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 'auto',
    flexDirection: 'row',
  },

  text: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },

  date: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 12,
    color: '#BDBDBD',
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 25,
  },

  evenDate: {
    justifyContent: 'flex-end',
  },

  oddDate: {
    justifyContent: 'flex-start',
  },

  image: {
    width: 343,
    height: 240,
    marginBottom: 32,
    marginLeft: 10,
  },

  inputContainer: {
    marginBottom: 16,
  },

  input: {
    height: 50,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 100,
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  button: {
    position: 'absolute',
    top: 8,
    right: 16,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    backgroundColor: '#FF6C00',
    borderRadius: 20,
  },
});

export default CommentScreen;
