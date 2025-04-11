import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function CameraUploadScreen() {
  const [imageUri, setImageUri] = useState(null);

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("카메라 권한이 필요합니다.");
      return;
    }

    const reseult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!reseult.canceled) {
      setImageUri(reseult.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) return Alert.alert("이미지를 먼저 찍어주세요!");

    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    // try {
    //     await axios.post
    // }
  };

  return (
    <View style={styles.container}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="카메라로 촬영하기" onPress={takePhoto} />
      <Button title="업로드드" onPress={uploadImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  image: { width: 250, height: 250, marginBottom: 20, borderRadius: 10 },
});
