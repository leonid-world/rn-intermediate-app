import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import axios from "axios";
import api from "../utils/axiosInstance";

import { UserContext } from "../context/UserContext";
import { storeUser } from "../utils/authStorage";

export default function LoginScreen({ navigation }) {
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // const response = await axios.post('http://192.168.200.108:8080/login',{
      const response = await api.post("/login", {
        mbrId: username,
        mbrPw: password,
      });

      const { Authorization, mbrName } = response.data;

      setUser({ Authorization, mbrName }); //전역 상태 저장

      await storeUser({ Authorization, mbrName }); //저장

      Alert.alert("로그인 성공!", `${mbrName}님 환영합니다.`);
      //   navigation.navigate("Home");
    } catch (err) {
      console.error(err);
      Alert.alert("로그인 실패, 아이디 혹은 패스워드를 확인해주세요");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      <TextInput
        style={styles.input}
        placeholder="ID"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="PW"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="로그인" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "80%",
    padding: 10,
    marginBottom: 10,
  },
});
