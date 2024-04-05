import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WishlistProductsScreen = ({ wishlist }) => {
  if (!wishlist || !Array.isArray(wishlist) || wishlist.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Wishlist Products</Text>
        <Text>No wishlist items</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist Products</Text>
      {wishlist.map((category, index) => (
        <Text key={index}>{category}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default WishlistProductsScreen;
