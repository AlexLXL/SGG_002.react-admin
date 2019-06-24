const USER_KEY = 'USER_KEY';
const USER_TIME = 'USER_TIME';
const EXPIRES_IN = 1000 * 3600 * 24 * 7;                // 写在上面方便复用的时候更改，这里是7天

const setItem = function (data) {
  localStorage.setItem(USER_KEY, JSON.stringify(data));
  localStorage.setItem(USER_TIME, Date.now());          // 登录的时候加入当前时间
};
const getItem = function () {
  const startTime = localStorage.getItem(USER_TIME);
  if(Date.now() - startTime > EXPIRES_IN) {
    removeItem();

    return {}
  }
  return JSON.parse(localStorage.getItem(USER_KEY));
};
const removeItem = function () {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(USER_TIME);
};

export {
  setItem,
  getItem,
  removeItem
}



