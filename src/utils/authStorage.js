import AsyncStorage from "@react-native-async-storage/async-storage";

const key = 'user';

export const storeUser = async (user) => {
    try{
        await AsyncStorage.setItem(key, JSON.stringify(user));
    } catch(e){
        console.error('유저 저장 실패 : ', e)
    }
}

export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem(key);
        return user ? JSON.parse(user) : null;
    } catch (e) {
        console.error('유저 불러오기 실패 ', e)
    }
}

export const removeUser = async () => {
    try {
        await AsyncStorage.removeItem(key);
    } catch(e){
        console.error('유저 삭제 실패', e);
    }
}