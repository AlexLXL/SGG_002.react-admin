import Ajax from "./ajax";
import jsonp from 'jsonp'
import {message} from 'antd'

// export const reqLogin = (data) => ajax('/login', data, 'POST');
// 请求参数3-4个以上使用
// export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST');
// 请求参数1-2个使用
export const reqLogin = (username, password) => Ajax('/login',{ username, password },'post');

// 发送验证的请求
export const reqValidateUserInfo = (id) => Ajax('/validate/user',{ id },'post');

export const reqWeather = function () { // 为了防止每次有模块加载api就发天气请求
  return new Promise((resolve, reject) => {
    jsonp('http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',{},(err, data) => {
      if(!err) {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0];
        resolve({
          dayPictureUrl,
          weather
        })
      }else {
        message.error(err, 2);
        reject()
      }
    })
  })
};

