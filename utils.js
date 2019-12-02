import { Linking, Alert, Platform } from "react-native";
export default {
  numberWithCommas: x => {
    if (x === "null") return undefined;
    else {
      let x2 = x.toString().replace(",", "");
      return x2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // else return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  formatDate: format => {
    var year = format.getFullYear();
    var month = format.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var date = format.getDate();
    if (date < 10) date = "0" + date;
    var hour = format.getHours();
    if (hour < 10) hour = "0" + hour;
    var min = format.getMinutes();
    if (min < 10) min = "0" + min;
    var sec = format.getSeconds();
    if (sec < 10) sec = "0" + sec;
    return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
  },
  transferTime: time => {
    var nowTime = new Date();
    var now = {
      year: nowTime.getFullYear(),
      month: nowTime.getMonth() + 1,
      date: nowTime.getDate(),
      hour: nowTime.getHours(),
      min: nowTime.getMinutes(),
      sec: nowTime.getSeconds()
    };
    var createdAt = {
      year: Number(time.substring(0, 4)),
      month: Number(time.substring(5, 7)),
      date: Number(time.substring(8, 10)),
      hour: Number(time.substring(11, 13)),
      min: Number(time.substring(14, 16)),
      sec: Number(time.substring(17, 19))
    };
    var gap = x => {
      return now[x] - createdAt[x];
    };
    if (gap("year")) return `${gap(`year`)}년전`;
    else if (gap("month")) return `${gap(`month`)}개월 전`;
    else if (gap("date")) return `${gap(`date`)}일 전`;
    else if (gap(`hour`)) return `${gap(`hour`)}시간 전`;
    else if (gap(`min`)) return `${gap(`min`)}분 전`;
    else if (gap(`sec`)) return `방금 전`;
  },
  transferChatTimeStamp: time => {
    var nowTime = new Date();
    var now = {
      year: nowTime.getFullYear(),
      month: nowTime.getMonth() + 1,
      date: nowTime.getDate(),
      hour: nowTime.getHours(),
      min: nowTime.getMinutes(),
      sec: nowTime.getSeconds()
    };
    var createdAt = {
      year: Number(time.substring(0, 4)),
      month: Number(time.substring(5, 7)),
      date: Number(time.substring(8, 10)),
      hour: Number(time.substring(11, 13)),
      min: Number(time.substring(14, 16)),
      sec: Number(time.substring(17, 19))
    };
    var gap = x => {
      return now[x] - createdAt[x];
    };
    var createdAt = {
      year: Number(time.substring(0, 4)),
      month: Number(time.substring(5, 7)),
      date: Number(time.substring(8, 10)),
      hour: Number(time.substring(11, 13)),
      min: Number(time.substring(14, 16)),
      sec: Number(time.substring(17, 19))
    };

    if (gap("year"))
      return `${createdAt.year.substr(2)}/${createdAt.month}/${date}`;
    if (gap("month") || gap("date"))
      return `${createdAt.month}월 ${createdAt.date}일`;
    else return `${createdAt.hour}:${createdAt.min}`;
  },
  transferOrderStatus: num => {
    const status = ["매칭대기", "매칭완료", "배송시작", "배송완료", "정산완료"];

    return status[num];
  },

  shortenText: (text, num) => {
    return text && text.length > num
      ? text.substr(0, num + 1) + `・・・`
      : text;
  },

  scoreColorPicker: num => {
    if (typeof num !== "number") num = Number(num);

    if (!isNaN(num)) {
      if (num >= 3.5) return "#32B049";
      if (num >= 2.5) return "#4181D0";
      else return "#757575";
    }
  },
  numOfScores: arrayOfScores => arrayOfScores.length,

  avgOfScores: arrayOfScores => {
    const numOfScores = arrayOfScores.length;

    const sumOfScores =
      arrayOfScores === null
        ? 0
        : arrayOfScores.reduce((acc, curr) => {
            return acc + curr.score;
          }, 0);
    return numOfScores ? (sumOfScores / numOfScores).toFixed(1) : 0;
  },
  phoneCall: phone => {
    // console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS === "android") {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  }
};
