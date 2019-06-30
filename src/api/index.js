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

export const reqProduct = (pageNum, pageSize) => Ajax('/manage/product/list',{pageNum, pageSize});

export const reqAddProduct = ({ name, desc, price, pCategoryId, categoryId, detail }) => Ajax('/manage/product/add',{ name, desc, price, pCategoryId, categoryId, detail },'post');

export const reqUpdateProduct = ({name, desc, price, categoryId, pCategoryId, detail, _id}) => Ajax('/manage/product/update', {name, desc, price, categoryId, pCategoryId, detail, _id}, 'POST');

export const reqRemovePic = (name, id) => Ajax('/manage/img/delete', {name, id}, 'post');

export const reqSearchProduct = ({ searchName, searchContent, pageNum, pageSize }) => Ajax('/manage/product/search', { [searchName]: searchContent, pageNum, pageSize });

export const reqRoleList = () => Ajax('/manage/role/list');

export const reqAddRole = (name) => Ajax('/manage/role/add',{name},'post');

export const reqUpdateRole = (_id, auth_name, menus) => Ajax('/manage/role/update',{_id, auth_name, menus},'post');

export const reqUserList =() => Ajax('/manage/user/list');

export const reqAddUser = ({username, password, phone, email, role_id}) => Ajax('/manage/user/add',{username, password, phone, email, role_id},'post');
