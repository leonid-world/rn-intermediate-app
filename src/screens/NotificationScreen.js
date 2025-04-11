import React, {useEffect} from "react";
import { View, Button, StyleSheet, Alert } from 'react-native'
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, sendNotification } from '../utils/notifications';

export default function NotificationScreen({navigation }) {
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            /**
             * token = 푸시 알림을 받을 디바이스의 고유 ID 개념
             * Firebase로 보내면 -> 해당 기기로 알림 전송됨
             * 서버에서 이 토큰을 저장해둬야 원하는 유저에게 알림을 보낼 수 있음
             * 
             * 해서, token은 서버에서 알림 보낼 때 필수로 쓰임
             *  */ 
            if(token) {
                console.log('✅ 알림 권한 허용됨, 토큰:', token);
            } else {
                Alert.alert('알림 권한이 없습니다!');
            }
        });

        //앱이 포그라운드 상태일 때 알림 수신
        /**
         * 포그라운드
         * = 앱이 화면에 떠 있는 상태, 즉 유저가 지금 현재 앱을 보고 있는 상태
         * * Foreground : 앱이 현재 화면에 있음
         * * Background : 앱이 켜져 있지만 다른 앱이 화면에 있음
         * * Terminated : 앱이 완전히 종료됨(프로세스도 사라짐)
         * 
         * OS정책상, 앱이 켜져 있으면 알림을 "알림창에 띄우지 않음"
         * 대신 > 우리가 직접 listner를 붙여서 반응하게 해야 함
         * 
         * 이걸 안 하면 포그라운드 상태에서는
         * 알람을 받긴 하지만, 화면에 아무 반응이 없음음
         */
        const receiveListener = Notifications.addNotificationReceivedListener(notification => {
            console.log('알림 수신 : ' , notification);
            const {title, body } = notification.request.content;
            Alert.alert(title, body);
        })

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            const data = response.notification.request.content.data;
            console.log('클릭한 알림의 데이터 : ', data);
            if(data?.screen){
                navigation .navigate(data.screen);
            }
        })

        /**
         * remove()
         * addNotificationReceivedListener()는 계속 살아있음
         * 화면을 이동해도 계속 작동하면 중복 호출됨
         * 
         * 그래서 언마운트 시 cleanup 꼭 해줘야 함
         */
        return () => {receiveListener.remove(); responseListener.remove()}
    }, []); // []로 선언하면 onMounted 와 같음

    return (
        <View style={styles.container}>
            <Button title="5초 후 알림 보내기" onPress={sendNotification}/>
        </View>
    )
}




    /**
     * 
     * 전체 흐름 요약
     * 1. App 실행 -> NotificationScreen 마운트
     * 2. useEffect : 권한 요청 + 알림 수신 리스너 등록
     * 3. 버튼 누름 > scheduleNotificationAsync() 로 5초 뒤 알림 예약
     * 4. 5초 뒤 알림 도착 (OS가 화면에 띄움 or 포그라운드면 콘솔로 전달)
     * 5. 화면 이동 시 useEffect 의 return 으로 리스너 정리리
     * 
     */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})