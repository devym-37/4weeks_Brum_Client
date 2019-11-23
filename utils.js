export default {
  numberWithCommas: x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  transferTime: time => {
    var nowTime = new Date();
    console.log(`nowTime: `, nowTime);
    var now = {
      year: nowTime.getFullYear(),
      month: nowTime.getMonth() + 1,
      date: nowTime.getDate(),
      hour: nowTime.getHours(),
      min: nowTime.getMinutes(),
      sec: nowTime.getSeconds()
    };

    console.log(`now: ${JSON.stringify(now)}`);
    console.log(`전체 생성시간 : `, time);
    var createdAt = {
      year: Number(time.substring(0, 4)),
      month: Number(time.substring(5, 7)),
      date: Number(time.substring(8, 10)),
      hour: Number(time.substring(11, 13)),
      min: Number(time.substring(14, 16)),
      sec: Number(time.substring(17, 19))
    };
    console.log(`createdAt: ${JSON.stringify(createdAt)}`);

    var gap = x => {
      return now[x] - createdAt[x];
    };

    if (gap("year")) return `${gap(`year`)}년전`;
    else if (gap("month")) return `${gap(`month`)}개월 전`;
    else if (gap("date")) return `${gap(`date`)}일 전`;
    else if (gap(`hour`)) return `${gap(`hour`)}시간 전`;
    else if (gap(`min`)) return `${gap(`min`)}분 전`;
    else if (gap(`sec`)) return `방금 전`;
  }
};
