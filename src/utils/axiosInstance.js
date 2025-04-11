// /utils/axiosInstance.js
import axios from "axios";
import { Alert } from "react-native";
import { getUser, setUser, logout } from "./authStorage"; // AsyncStorage 연동 시 사용 (선택)

const instance = axios.create({
  baseURL: "https://always-e5aa7517715d.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

// // 요청 시 Authorization 헤더 자동 주입
// instance.interceptors.request.use(
//   async config => {
//     const user = await getUser(); // 또는 Context에서 user 가져오기
//     if (user?.Authorization) {
//       config.headers.Authorization = `Bearer ${user.Authorization}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );

// // 응답 시 401 → 자동 로그아웃 or 토큰 재발급 시도
// instance.interceptors.response.use(
//   response => response,
//   async error => {
//     if (error.response?.status === 401) {
//       Alert.alert('세션 만료', '다시 로그인해주세요');
//       await logout(); // AsyncStorage 초기화 or context 초기화
//       // navigation 못 쓰니까 이벤트로 로그인 페이지로 보낼 수도 있음
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
