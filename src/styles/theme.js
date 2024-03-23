import { StyleSheet } from 'react-native';

import alarmIcon from '../../assets/icons/alarm.png';
import categoryIcon from '../../assets/icons/category.png';
import chatRoom from '../../assets/icons/chating.png';
import myPageIcon from '../../assets/icons/mypage.png';
import searchIcon from '../../assets/icons/search.png';
import homeIcon from '../../assets/icons/home.png';
import heart from '../../assets/icons/heart.png';
import heartClick from '../../assets/icons/heartClick.png';
import chat from '../../assets/icons/chat.png';
import close from '../../assets/icons/close.png';
import camera from '../../assets/icons/camera.png';
import report from '../../assets/icons/report.png';

export const colors = {
    mainYellow: '#FFDE66',
    secondYellow: '#FFF1BC',
    mainGreen: '#6A9C78',
    secondGreen: '#C3E0B2',
    mainGray: '#807D73',
    darkGray: '#55503E',
    background: '#FCFCFA',
    point: '#ED2B2A',
  };

export const icons = {
    alarm: alarmIcon,
    category: categoryIcon,
    chat: chatRoom,
    myPage: myPageIcon,
    search: searchIcon,
    home: homeIcon,
    heart: heart,
    heartClick: heartClick,
    chat: chat,
    close: close,
    camera: camera,
    report: report,
  };
  
export const theme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
  },
});
