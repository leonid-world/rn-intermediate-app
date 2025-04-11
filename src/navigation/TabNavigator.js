import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { UserContext } from "../context/UserContext";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ImageUploadScreen from "../screens/ImageUploadScreen";
import CameraUploadScreen from "../screens/CameraUploadScreen";

import NotificationScreen from "../screens/NotificationScreen";

import BottomSheetScreen from "../screens/BottomSheetScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { user } = useContext(UserContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home")
            iconName = focused ? "home" : "home-outline";

          if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";

          if (route.name === "Settings")
            iconName = focused ? "settings" : "settings-outline";

          if (route.name === "Upload")
            iconName = focused ? "cloud-upload" : "cloud-upload-outline";

          if (route.name === "Camera")
            iconName = focused ? "camera" : "camera-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="BottomSheet" component={BottomSheetScreen} />

      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      {/**
       * 로그인한 유저만 보이는 탭
       */}
      {user && (
        <>
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Upload" component={ImageUploadScreen} />
          <Tab.Screen name="Camera" component={CameraUploadScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}
