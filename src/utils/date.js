export const DateUtil = {
  /**
   * 时间格式化
   * @example getFormat(new Date("2021-06-01"), "yyyy-MM-dd hh:mm:ss") => "2021-06-01 08:00:00"
   * @param format
   * @param date
   * @returns {string|Date}
   */
  getFormat(date = new Date(), format = 'yyyy-MM-dd hh:mm:ss') {
    date = new Date(date);

    const keyMap = {
      y: date.getFullYear(),
      M: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
      w: date.getDay(),
    };

    Object.keys(keyMap).forEach((key) => {
      format = format.replace(new RegExp(`${key}+`, 'g'), function (s) {
        const value = String(keyMap[key]);
        return key === 'y'
          ? ('0000' + value).slice(-s.length)
          : key === 'w'
          ? '星期' + '日一二三四五六'[value]
          : ('00' + value).slice(-Math.max(value.length, s.length));
        // : ("" + value).padStart(Math.max(value.length, s.length), "0"); // str.padStart(2, "0"), ES6语法，str位数不足2位，前面补0
      });
    });

    return format;
  },
};
