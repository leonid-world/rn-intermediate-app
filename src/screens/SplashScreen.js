import React from "react";
import { View, Text, ActivityIndicator, StyleSheet} from 'react-native'


export default function SplashScreen(){
    return (
        <View style={StyleSheet.container}>
            <ActivityIndicator size="large" color="#ffffff"/>
            <Text style={styles.text}>앱 불러오는 중...</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'
    },
    text: {
        color: '#fff', marginTop: 10
    }
})