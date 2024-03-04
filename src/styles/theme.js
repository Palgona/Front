import { StyleSheet } from 'react-native';

import alarmIcon from '../../assets/icons/alarm.png';
import categoryIcon from '../../assets/icons/category.png';
import chatRoom from '../../assets/icons/chating.png';
import myPageIcon from '../../assets/icons/mypage.png';
import searchIcon from '../../assets/icons/search.png';
import homeIcon from '../../assets/icons/home.png';
import heart from '../../assets/icons/heart.png';
import chat from '../../assets/icons/chat.png';
import close from '../../assets/icons/close.png';

export const colors = {
    main: '#F2CD5C',
    secondary: '#A8ABA6',
    point: '#F4965B',
  };

export const icons = {
    alarm: alarmIcon,
    category: categoryIcon,
    chat: chatRoom,
    myPage: myPageIcon,
    search: searchIcon,
    home: homeIcon,
    heart: heart,
    chat: chat,
    close: close,
  };
  
export const theme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // 흰색 배경
  },
});
