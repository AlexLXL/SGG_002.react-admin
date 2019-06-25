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
  let cancel = null;

  const promise = new Promise((resolve, reject) => {
    cancel = jsonp('http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',{},(err, data) => {
      if(!err) {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0];
        resolve({         // 不能再这里返回cancel的原因是，这里在new promise里面，外面调用还是会await，没办法立即取消，
          dayPictureUrl,       // 所以promise和cancel要在同级，并同时返回
          weather
        })
      }else {
        message.error(err, 2);
        reject()
      }
    })
  });

  return {
    promise,
    cancel
  }
};

export const reqCategory = (parentId) => Ajax('/manage/category/list',{parentId});

export const reqAddCategory = (parentId, categoryName) => Ajax('/manage/category/add',{parentId, categoryName},'post');

export const reqUpdateName = (categoryId, categoryName) => Ajax('/manage/category/update',{categoryId, categoryName},'post');


