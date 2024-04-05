import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import WishlistScreen from './WishlistScreen';

const CategoryScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [isSearchInputOpen, setIsSearchInputOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProductsByCategory = async (categoryName) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
      const data = await response.json();
      navigation.navigate('Category', { title: categoryName, products: data.products });
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };

  const toggleSearchInput = () => {
    setIsSearchInputOpen(!isSearchInputOpen);
  };

  const handleSearchPress = () => {
    toggleSearchInput();
    searchProducts();
  };

  const searchProducts = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.products);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const addToCart = (categoryName) => {
    if (!cart.includes(categoryName)) {
      setCart([...cart, categoryName]);
    } else {
      setCart(cart.filter(item => item !== categoryName));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Categories</Text>
        {isSearchInputOpen ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              onChangeText={(text) => setSearchQuery(text)}
              onSubmitEditing={searchProducts}
            />
            <TouchableOpacity onPress={toggleSearchInput}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleSearchPress}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.categoryContainer}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => fetchProductsByCategory(item)}>
                <View style={[styles.categoryItem, { marginBottom: 10 }]}>
                  <Text style={styles.categoryName}>{item}</Text>
                  {/* Add to Cart Button */}
                  <TouchableOpacity onPress={() => addToCart(item)}>
                    <Ionicons 
                      name={cart.includes(item) ? 'cart' : 'cart-outline'}
                      size={24} 
                      color={cart.includes(item) ? 'blue' : 'black'}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.wishlistContainer}>
          <WishlistScreen wishlist={wishlist} />
        </View>
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  scrollContainer: {
    height: '80%',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryItem: {
    marginRight: 15,
    borderWidth: 1,
    padding: 50,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    textAlign: 'center',
  },
  wishlistContainer: {
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    flex: 1,
  },
});

export default CategoryScreen;
