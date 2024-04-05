import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import WishlistScreen from './WishlistScreen';


const HomeScreen = () => {
  const navigation = useNavigation();
  const [bannerImages, setBannerImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchInputOpen, setIsSearchInputOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    fetchBannerImages();
    fetchCategories(); 
  }, []);

  const fetchBannerImages = async () => {
    try {
      const bannerImages = [
        require('../images/banner/banner1.jpg'),
        require('../images/banner/banner2.jpg'),
        require('../images/banner/banner3.jpg'),
      ];
      setBannerImages(bannerImages);
    } catch (error) {
      console.error('Error fetching banner images:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const data = await response.json();
      setCategories(data.map(category => ({ name: category, inWishlist: false })));
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

  const searchProducts = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.products);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const addToWishlist = (categoryName) => {
    if (!wishlist.includes(categoryName)) {
      setWishlist([...wishlist, categoryName]);
    }
  };

  const toggleSearchInput = () => {
    setIsSearchInputOpen(!isSearchInputOpen);
  };

  const removeFromWishlist = (categoryName) => {
    setWishlist(wishlist.filter(item => item !== categoryName));
  };

  const handleSearchPress = () => {
    toggleSearchInput();
  };
  
  

  const toggleWishlist = (categoryName) => {
    const updatedCategories = categories.map(category => 
      category.name === categoryName ? { ...category, inWishlist: !category.inWishlist } : category
    );
    setCategories(updatedCategories);
    const updatedWishlist = updatedCategories.filter(category => category.inWishlist).map(category => category.name);
    setWishlist(updatedWishlist);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>
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
      <View style={styles.bannerContainer}>
        <FlatList
          data={bannerImages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={styles.bannerImage} />
          )}
        />
      </View>
      <TouchableOpacity onPress={() => console.log('See All Categories')}>
        <Text style={styles.seeAll}>See All</Text>
      </TouchableOpacity>
      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => fetchProductsByCategory(item.name)}>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryName}>{item.name}</Text>
                <TouchableOpacity onPress={() => toggleWishlist(item.name)}>
                  <Ionicons 
                    name={item.inWishlist ? 'heart' : 'heart-outline'}
                    size={24} 
                    color={item.inWishlist ? 'red' : 'black'}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
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
  bannerContainer: {
    height: 200,
    marginBottom: 10,
    backgroundColor:'#D9D9D9',
    margin: 10,
    borderRadius: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryContainer: {
    paddingHorizontal: 10,
    marginTop:20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    marginBottom: 10,
    padding: 50,
    borderRadius: 10,
  },
  categoryName: {
    fontWeight: 'bold',
  },
  seeAll: {
    color: 'blue',
    textAlign: 'end',
    margin: 10,
  },
  wishlistContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
});

export default HomeScreen;
