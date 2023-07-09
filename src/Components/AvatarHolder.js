import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import LoadImageButton from './LoadImageButton';
import AvatarImage from '../Images/default-user.png';

const AvatarHolder = ({ onAvatarLoaded }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      onAvatarLoaded(uri);
    } else {
      alert('You did not select any image.');
    }
  };
  const imageSource = { uri: selectedImage };
  return (
    <View style={styles.fotoWrapper}>
      <View style={styles.imageHolder}>
        {selectedImage && <Image source={imageSource} style={styles.logo} />}
      </View>
      <LoadImageButton onButtonClick={pickImageAsync}></LoadImageButton>
    </View>
  );
};

const styles = StyleSheet.create({
  fotoWrapper: {
    width: 130,
    height: 130,
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: [{ translateX: -65 }, { translateY: -65 }],
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
  logo: {
    width: 110,
    height: 110,
    borderRadius: 16,
  },
});

export default AvatarHolder;
