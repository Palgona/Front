import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const buttonStyles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: colors.secondYellow, // 연한 회색 배경색
    borderRadius: 50, // 검색 바 모서리 둥글게
    paddingHorizontal: 20,
    margin: 15,
    marginTop: 30,
  },
  previousSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20, // 간격 조정
  },
  previousSearchText: {
    fontSize: 15, // 글씨 크기 살짝 키우기
    marginRight: 5, // 간격 조정
    color: colors.mainGray,
  },
  smallButton:{
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 8,
    width: 40,
    height: 40,
    marginLeft: 5,
    backgroundColor: 'white',
  },
  iconimage:{
    width: 24,
    height: 24,
    tintColor: colors.darkGray,
  }
  
});
