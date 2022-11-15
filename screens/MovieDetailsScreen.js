import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  } from "react-native";

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import { AntDesign } from "@expo/vector-icons";
import MoviesAPI from "../services/MoviesAPI"
import { moviImage } from "../utils";

export default function MovieDetailsScreen({ route ,navigation }) {

  const {id}  = route.params;
  console.log("id param",id )
  const [movie, setMovie] = useState();

  useEffect(async () => {
   let movieDetails = await MoviesAPI.getMovieDataById(id)
   setMovie(movieDetails)
 
}, []);

  return (
    
    <SafeAreaView style={styles.container}>

      <View style={styles.back}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <AntDesign  name="leftcircle" size={30} color={Colors.primary} />
        </TouchableOpacity>
      </View>
{
  movie ?
  <View style={styles.body}>
    <View style={styles.item}>
      <Image
        style={{width: 180, height: 180, justifyContent:"center", alignItems: "center", flex:1,}}
        source={{uri: moviImage+movie.backdrop_path}}
      />
    </View> 

    <View style={styles.details}>
      <Text style={styles.logoText}>{movie.original_title}</Text>
      <Text style={styles.logoText}>{movie.runtime} min</Text>
    </View> 
        
       
              <Text style={styles.label}>The movie is about :</Text>
              <Text style={styles.overview}>{movie.overview}</Text>

       
       
       
       <View style={styles.footer}>
        <Text style={styles.logoText}>{movie.release_date}</Text>
        <View style={styles.footerDet}>
        <Text style={styles.title}>{movie.production_companies[0].name}</Text>
        <Text style={styles.title}>{movie.genres[0].name}</Text>
        </View>
        
       </View>
       
          
      </View>
  : null
}
      
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header :{
    top: Layout.height * 0.2,
    flexDirection: "row",
    justifyContent:"center",
    alignItems: "center",
  },
  logo: {
    width: 20,
    height: 130,
  },
  logoText:{
    fontSize: 20,
    fontWeight: "bold",
  },
  back:{
    top: Layout.height * 0.1,
    flexDirection: "row",
    justifyContent:"flex-start",
    alignItems: "center",
  },
  
  body: {
    top: Layout.height * 0.15,
  },
  label:{
    top: 10,
    fontSize: 20,
    fontWeight: "bold",
    color:Colors.primary,

  },
  item: {
    width: Layout.width,
    height: Layout.height * 0.2,
    position:'relative',
    justifyContent:"center",
    alignItems: "center",
    borderRadius: 20,
  },
  title: {
    color: Colors.black,
    justifyContent:"center",
    alignItems: "center",
  },
  details:{
    flexDirection: "row",
    justifyContent:"space-between",
    fontSize: 100,
    fontWeight: "bold",
  },
  footer:{
   top: 50,
   flexDirection: "row",
    justifyContent:"space-between",
  },
  footerDet:{
    flexDirection: "column",
     justifyContent:"center",
   },
  overview:{
    top: 10,
    fontSize: 25,
    fontWeight: "200",
  }

});
