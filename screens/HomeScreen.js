import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TextInput,
  FlatList,
  RefreshControl,
  Animated,
  TouchableOpacity,
} from "react-native";

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import icon from '../assets/images/icon.png';
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';
import { moviImage } from "../utils";
import { getMovies, liveSearch } from "../redux/actions/appApi"
import {selectMovies} from "../redux/actions/movieSlice"

export default function HomeScreen({ navigation }) {

  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);

  const [refreshing, setRefreshing] = useState(false);
  // const [movies, setMovies] = useState();
  const [id, setId] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const scrollX = new Animated.Value(0)

  const onMomentumScrollEnd = (e) => {
    const pageNumber = Math.min(
      Math.max(
        Math.floor(e.nativeEvent.contentOffset.x / Layout.width + 0.5) + 1,
        0
      ),
      7
    );
  };

  useEffect(() => {
    dispatch(getMovies())
    return () => { }
  }, [])

  const [searchPhrase, setSearchPhrase] = useState("");
  
  useEffect(() => {
    if (movies.length > 0) {
      
 
    console.log("search ", searchPhrase);
    let query = searchPhrase.toLowerCase();
    let searchResult = movies.filter(movie => {
      if (movie.original_title) {
        movie.original_title.toLowerCase().includes(query)
      }
    })
    console.log(searchResult);
    // dispatch(liveSearch(searchResult))
  }
    return () => { }
  }, [searchPhrase])

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={icon}
        />
        <Text style={styles.logoText}>MovieOnline</Text>

      </View>

{/* The search it works but not all the data have the same attributes in the json like name or title that's why I couldn't finsh it  */}
      <View style={styles.search}>
        <AntDesign name="search1" size={24} color={Colors.primary} />
        <TextInput
          style={styles.input}
          placeholder="Search"
        onChangeText={setSearchPhrase}
        />
      </View>

      <View style={styles.body}>
        <Text style={styles.label}>Trending Films of the week :</Text>
        <FlatList
          style={{ marginTop: 10 }}
          numColumns={1}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          data={movies}
          onMomentumScrollEnd={onMomentumScrollEnd}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }

          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <TouchableOpacity style={styles.flat} onPress={() => { setSelectedId(item.id); navigation.navigate('MovieDetail', { id: item.id }) }} >
              <Image
                style={styles.flat}
                source={{ uri: moviImage + item.backdrop_path }}
              />
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    right: 5,
    left: 5,
  },
  header: {
    top: Layout.height * 0.05,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 20,
    height: 130,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  search: {
    top: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    padding: 10,
    flexDirection: "row",
    width: "85%",
    backgroundColor: Colors.gray,
    borderRadius: 15,
    alignItems: "center",
  },
  body: {
    top: Layout.height * 0.15,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,

  },
  item: {
    backgroundColor: Colors.black,
    padding: 20,
    marginHorizontal: 10,
    width: Layout.width * 0.55,
    height: Layout.height * 0.35
  },
  title: {
    color: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
   flat:{
     width: 180, height: 180, justifyContent: "center", alignItems: "center", flex: 1, 
    }

});
