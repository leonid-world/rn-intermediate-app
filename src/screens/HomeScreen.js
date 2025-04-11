import React, { useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { UserContext } from "../context/UserContext";
import { removeUser } from "../utils/authStorage";

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    setUser(null);
    await removeUser();
    navigation.replace("Login"); //뒤로가기 방지 및 로그인으로 리셋
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>홈 화면</Text>
      <Text style={styles.nickname}>
        정상에서 기다리고 있던 {user.mbrName}님⛰️
      </Text>
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  nickname: { fontSize: 18, marginBottom: 10 },
  token: { fontSize: 14, color: "#666", marginBottom: 20 },
});

/**
 * 샤워GPT
 *
 * 일론머스크가 AI 로  아침에 샤워할때 음성인식으로 스케쥴관리
 *
 * 배민에서 찾음
 * 점주들이 음식사진 업로드할 때
 *
 * 하루에 만건 평균
 *
 * 배민 API -> ChatGPT 프롬프트 만들어서
 * 사진 분석한 다음
 * JSON 파일로 리턴
 * title, detail, time
 *
 * 스케쥴 음성으로 입력 -> title, detail, time
 *
 */
