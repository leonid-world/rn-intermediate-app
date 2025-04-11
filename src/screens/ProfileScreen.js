import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function ProfileScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>프로필 화면이에요 🧔</Text>
      {/* <Button title="홈으로 돌아가기" onPress={() => navigation.goBack()} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 20, marginBottom: 20 },
  text: { fontSize: 20 },
  name: { fontSize: 18, fontWeight: "500" },
});
