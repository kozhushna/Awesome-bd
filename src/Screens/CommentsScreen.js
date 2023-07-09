import React, { useState } from 'react';
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
import { AntDesign } from '@expo/vector-icons';
import Sea from '../Images/Sea.jpg';

const COMMENTS = [
  {
    id: '1',
    image: require('../Images/Avatar.png'),
    text: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
    date: '09 червня, 2020 | 08:40',
  },
  {
    id: '2',
    image: require('../Images/MainAvatar.png'),
    text: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
    date: '09 червня, 2020 | 08:40',
  },
  {
    id: '3',
    image: require('../Images/Avatar.png'),
    text: 'Thank you! That was very helpful!',
    date: '09 червня, 2020 | 09:20',
  },
  {
    id: '4',
    image: require('../Images/Avatar.png'),
    text: 'Thank you! That was very helpful!',
    date: '09 червня, 2020 | 09:20',
  },
];

const CommentScreen = () => {
  const [comments, setComments] = useState(COMMENTS);
  const [comment, setComment] = useState('');

  const renderItem = (item, index) => (
    <View
      style={[
        styles.commentContainer,
        index % 2 === 0 ? styles.evenRow : styles.oddRow,
      ]}
    >
      <Image source={item.image} />
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

  const getItem = (_data, index) => {
    const entity = comments[index];
    return {
      id: entity.id,
      text: entity.text,
      image: entity.image,
      date: entity.date,
    };
  };

  const getItemCount = (_data) => comments.length;

  return (
    <View style={styles.container}>
      <Image source={Sea} style={styles.image} />
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
        />

        <TouchableHighlight style={styles.button}>
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
