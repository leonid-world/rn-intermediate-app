import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
    
    /**
     * Android 는 채널 설정이 필수
     * 안하면 알림이 안 뜰 수도 있음
     * 
     * iOS 는 채널이라는 개념이 없음 (iOS는 알림 설정 UI를 OS가 전담한다.)
     * 
     * 그래서 Android만 특별히 설정해줘야 하므로 조건문 처리
     */
    if(Platform.OS === 'android'){
        await Notifications.setNotificationChannelAsync('default', {
            name: '기본 채널',
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if(Device.isDevice){
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if(existingStatus !== 'granted'){
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted'){
            alert('알림 권한이 거부되었습니다!');
            return null;
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('📱 Expo Push Token:', token);
        return token;
    } else {
        alert('실제 디바이스에서만 알림이 작동합니다!');
        return null;
    }
}

export async function sendNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: '📣 알림 도착!',
            body: '개피티가 보낸 테스트 알림이에요',
            data: {screen: 'Profile'}, //클릭시 이동할 페이지 정보 전달
            // sound: 'default',
        },
        trigger: { seconds: 5}, //5초 뒤에 알림 전송, 배치처럼 스케쥴링하여 예약 알림이 가능함. 하지만 특정 이슈나 이벤트 기반 알림은 서버에서 푸시 알림 전송 방식으로 하기 때문에 다른 접근이 필요
    });
}