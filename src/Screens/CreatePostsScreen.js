import React, { useState, useEffect, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addPost } from '../Redux/postsActions';
import { useDispatch } from 'react-redux';
import { useAuth } from '../Redux/useAuth';
import { createPost } from '../Services/posts-service';

const CreatePostScreen = () => {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showImageContainer, setShowImageContainer] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
      setShowImageContainer(status !== 'granted');
    })();
  }, []);

  const handlePublishButtonPress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    let posts = await createPost({
      userId: user.id,
      name,
      place,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    dispatch(addPost(posts));
    setName('');
    setPlace('');
    navigation.navigate('HomeTab');
  };
  const isPublishButtonEnabled = () => name && place;

  return (
    <View>
      <View style={styles.container}>
        {!showImageContainer ? (
          <View style={styles.fotoInput}>
            <Camera style={styles.camera} type={type} ref={setCameraRef}>
              <View style={styles.photoView}>
                <TouchableOpacity
                  style={[
                    styles.imageHolder,
                    cameraRef ? styles.imageHolderActive : null,
                  ]}
                  onPress={async () => {
                    if (cameraRef) {
                      const { uri } = await cameraRef.takePictureAsync();
                      await MediaLibrary.createAssetAsync(uri);
                    }
                  }}
                >
                  <AntDesign name="camera" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        ) : (
          <View style={styles.fotoInput}>
            <View style={styles.imageHolder}>
              <AntDesign name="camera" size={24} color="#BDBDBD" />
            </View>
          </View>
        )}
        <Pressable title="Upload" style={styles.uploadButton}>
          <Text style={styles.buttonText}>Завантажте фото</Text>
        </Pressable>
        <TextInput
          style={styles.inputName}
          placeholder="Назва..."
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.inputLocation}
          placeholder="Місцевість..."
          onChangeText={setPlace}
          value={place}
        />
        <Text style={styles.locationImage}>
          <AntDesign name="enviromento" size={24} color="#BDBDBD" />
        </Text>

        <Pressable
          title="publish"
          disabled={!isPublishButtonEnabled()}
          style={[
            styles.button,
            isPublishButtonEnabled() ? styles.buttonEnabled : null,
          ]}
          onPress={handlePublishButtonPress}
        >
          <Text
            style={[
              styles.buttonText,
              isPublishButtonEnabled() ? styles.buttonTextEnabled : null,
            ]}
          >
            Опублікувати
          </Text>
        </Pressable>
        <View style={styles.buttonHolder}>
          <Pressable title="delete" style={styles.deleteButton}>
            <AntDesign name="delete" size={24} color="#DADADA" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: 34,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  },

  fotoInput: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
    marginBottom: 8,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
  },

  imageHolder: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
  },

  imageHolderActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },

  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  photoView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: 'flex-end',
  },

  uploadButton: {
    width: 131,
    height: 19,
    marginBottom: 32,
  },

  buttonText: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
    textAlign: 'center',
  },

  buttonEnabled: {
    backgroundColor: '#FF6C00',
  },

  buttonTextEnabled: {
    color: '#FFFFFF',
  },

  text: {
    marginBottom: 32,
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 16,
    color: '#BDBDBD',
  },

  inputName: {
    height: 50,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  inputLocation: {
    paddingLeft: 32,
    height: 50,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    marginBottom: 32,
  },
  locationImage: {
    position: 'absolute',
    top: 410,
    left: 20,
  },

  button: {
    paddingVertical: 15,
    height: 50,
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    marginBottom: 120,
  },

  buttonHolder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 34,
  },

  deleteButton: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 40,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
});

export default CreatePostScreen;
