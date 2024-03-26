import AsyncStorage from '@react-native-async-storage/async-storage';

// 액세스 토큰을 AsyncStorage에 저장하는 함수
export const storeAccessToken = async (accessToken) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    console.log('액세스 토큰이 AsyncStorage에 저장되었습니다.');
  } catch (error) {
    console.error('액세스 토큰을 AsyncStorage에 저장하는 중에 오류가 발생했습니다:', error);
  }
};

// AsyncStorage에서 액세스 토큰을 불러오는 함수
export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken !== null) {
      console.log('AsyncStorage에서 액세스 토큰을 성공적으로 불러왔습니다.');
      return accessToken;
    } else {
      console.log('AsyncStorage에 저장된 액세스 토큰이 없습니다.');
      return null;
    }
  } catch (error) {
    console.error('액세스 토큰을 AsyncStorage에서 불러오는 중에 오류가 발생했습니다:', error);
    return null;
  }
};

// 액세스 토큰을 삭제하는 함수
export const removeAccessToken = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
    console.log('AsyncStorage에서 액세스 토큰을 성공적으로 삭제했습니다.');
  } catch (error) {
    console.error('액세스 토큰을 AsyncStorage에서 삭제하는 중에 오류가 발생했습니다:', error);
  }
};
