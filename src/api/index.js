import Ajax from "./ajax";


// export const reqLogin = (data) => ajax('/login', data, 'POST');
// 请求参数3-4个以上使用
// export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST');
// 请求参数1-2个使用
export const reqLogin = (username, password) => Ajax('/login',{ username, password },'post');

// 发送验证的请求
export const reqValidateUserInfo = (id) => Ajax('/validate/user',{ id },'post');

