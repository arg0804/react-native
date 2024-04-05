import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import WishlistScreen from './WishlistScreen';

const ProfileScreen = ({ navigation }) => {

  const [wishlist, setWishlist] = useState([]);


  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.userInfo}>
        <Text>John Smith</Text>
      </View>
      <Button title="Logout" onPress={handleLogout} />
      <View style={styles.wishlistContainer}>
          <WishlistScreen wishlist={wishlist} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userInfo: {
    marginBottom: 20,
  },
});

export default ProfileScreen;
