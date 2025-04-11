import React, {useState} from "react";
import {View, Button, Image, StyleSheet,ScrollView,  Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker';

import axios from 'axios';

export default function ImageUploadScreen(){
    // const [imageUri, setImgUri] = useState(null);
    const [imageUris, setImgUris] = useState([]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: false,
            allowsMultipleSelection: true,
            quality: 1
        });

        if (!result.canceled){
            const selectedUris = result.assets.map(asset => asset.uri);
            // const uri = result.assets[0].uri;
            // console.log('선택된 이미지 : ', uri);
            // setImgUri(uri);
            setImgUris(selectedUris)
        }
    };
    
    const uploadImage = async () => {
        if (!imageUris.length) return Alert.alert('이미지를 먼저 선택해주세요');

        const formData = new FormData();

        imageUris.forEach((uri, i) => {
            formData.append('file', {
                uri,
                name: `image${i}.jpg`,
                type: 'image/jpeg',
            });

        })
        

    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {
                imageUris.map((uri, index) => (
                    <Image key={index} source={{uri}} style={styles.image}/>
                ))
            }
            <Button title="이미지 여러장 선택" onPress={pickImage}/>
            <Button title="업로드" onPress={uploadImage}/>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: { alignItems: 'center', padding: 20, gap: 10 },
    image: { width: 200, height: 200, marginBottom: 10, borderRadius: 10 },
})