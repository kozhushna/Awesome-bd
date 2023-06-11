import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import CloseImageButton from './CloseImageButton';
import ProfileImage from '../Images/Profile.png';

const AvatarImageHolder = () => {
  return (
    <View style={styles.fotoWrapper}>
      <View style={styles.imageHolder}>
        <CloseImageButton />
        <Image source={ProfileImage} />
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
});

export default AvatarImageHolder;
