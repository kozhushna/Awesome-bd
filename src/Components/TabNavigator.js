import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsScreen from '../Screens/PostsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import LogOut from '../Icons/LogOut.svg';
import CreatePostScreen from '../Screens/CreatePostsScreen';
import { logOut } from '../Services/auth-service';
import { useDispatch } from 'react-redux';
import { clearUser } from '../Redux/userActions';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="HomeTab"
        component={PostsScreen}
        options={{
          title: 'Публікації',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0, 0, 0, 0.3)',
          },
          headerTintColor: '#212121',
          headerTitleStyle: {
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: 17,
            lineHeight: 22,
          },
          tabBarIcon: ({ focuced }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../Icons/grid.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          ),

          headerLeft: () => null,
          headerRight: () => {
            const navigation = useNavigation();
            const dispatch = useDispatch();
            return (
              <TouchableOpacity
                style={styles.button}
                title="Log Out"
                onPress={async () => {
                  await logOut();
                  dispatch(clearUser());
                  navigation.navigate('Login');
                }}
                color="white"
              >
                <View style={styles.buttonContainer}>
                  <LogOut width={24} height={24} />
                </View>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostScreen}
        options={{
          tabBarStyle: { display: 'none' },
          title: 'Створити публікацію',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0, 0, 0, 0.3)',
          },
          headerTintColor: '#212121',
          headerTitleStyle: {
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: 17,
            lineHeight: 22,
          },
          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <TouchableOpacity
                title="Home"
                onPress={() => navigation.navigate('HomeTab')}
                color="white"
              >
                <View style={[styles.buttonContainer, styles.nav]}>
                  <AntDesign name="arrowleft" size={24} color="black" />
                </View>
              </TouchableOpacity>
            );
          },
          tabBarIcon: ({ focuced }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                height: 40,
                backgroundColor: '#FF6C00',
                borderRadius: 20,
              }}
            >
              <Image
                source={require('../Icons/Union.png')}
                resizeMode="contain"
                style={{
                  width: 13,
                  height: 13,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focuced }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../Icons/user.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 25,
    height: 25,
    marginRight: 10,
  },

  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    marginRight: 0,
    marginLeft: 10,
  },
});

export default TabNavigator;
