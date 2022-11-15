import React  from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";
import { AntDesign } from '@expo/vector-icons'; 

import HomeScreen from '../screens/HomeScreen'
import Colors from "../constants/Colors";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import MoviesScreen from "../screens/MoviesScreen";

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.black,
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color}/>
          )
        }}
        name="Home"
        component={HomeScreen}
      />
       <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          )
        }}
        name="Search"
        component={MoviesScreen}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export function AppStack() {
  const dispatch = useDispatch();
  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
              cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen name="Tabs" component={MainTabs} />     
          <Stack.Screen name="MovieDetail" component={MovieDetailsScreen} />         
        </Stack.Navigator>
      </NavigationContainer>
  );
}
