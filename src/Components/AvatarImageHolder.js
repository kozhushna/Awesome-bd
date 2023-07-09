import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import CloseImageButton from './CloseImageButton';
import ProfileImage from '../Images/Profile.png';
import { useAuth } from '../Redux/useAuth';

const AvatarImageHolder = () => {
  const { user } = useAuth();
  const avatar = user?.photoURL
    ? {
        uri: user?.photoURL,
      }
    : ProfileImage;

  return (
    <View style={styles.fotoWrapper}>
      <View style={styles.imageHolder}>
        <CloseImageButton />
        <Image source={avatar} style={styles.avatar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fotoWrapper: {
    width: 130,
    height: 130,
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: [{ translateX: -55 }, { translateY: -55 }],
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageHolder: {
    height: '100%',
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
  },
});

export default AvatarImageHolder;
