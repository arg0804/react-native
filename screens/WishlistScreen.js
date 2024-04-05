import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const WishlistScreen = ({ wishlist }) => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateToScreen('Home')}>
          <Ionicons name="home" size={24} style={{textAlign:'center', color:'#CACACA'}}/>
          <Text style={{color:'#7867BE', marginTop:15}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Category')}>
          <Ionicons name="grid" size={24} style={{textAlign:'center', color:'#CACACA'}}/>
          <Text style={{color:'#7867BE', marginTop:15}}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('WishlistProducts')}>
          <Ionicons name="heart" size={24} style={{textAlign:'center', color:'#CACACA'}} />
          <Text style={{color:'#7867BE', marginTop:15}}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Profile')}>
          <Ionicons name="person" size={24} style={{textAlign:'center', color:'#CACACA'}} />
          <Text style={{color:'#7867BE', marginTop:15}}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    textAlign:'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default WishlistScreen;
