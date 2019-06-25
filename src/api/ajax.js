import axios from "axios";
import { message } from "antd";

export default function ajax(url, data, method='get') { // data用的时候传的就是对象
  let reqParam = data;
  method = method.toLowerCase();

  if(method === 'get') {
    reqParam = {
      params: {data}
    }
  }

  return axios[method](url,reqParam)     // 没加配置对象导致一直返回的statue是1.===这里涉及跨域，用到代理服务器=== 返回的promise对象？？===
    .then((res) => {                              // res就是postman测试api返回的那个内容
      const { data } = res;

      if(data.status === 0) {
        return data.data || {};     // === 上面的return根本返回不了任何东西，没有返回promise对象，实际返回的是这个data.data，需要看一下promise返回 ===
      }else {
        message.error(data.msg, 2);               // 登录失败，账号或者密码错误
      }
    })
    .catch((err) => {
      message.error('网络故障，请刷新网页~',2);
    })
}