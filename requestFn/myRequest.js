const app = getApp();
const baseURL = app.globalData.baseURL;
const FN = require('../publicFn/public');

const MyRequest = (options) => {
  return new Promise((resolve, reject) => {
    FN.Loading(1);
    wx.request({
      url: baseURL + options.url || '',
      data: options.data || {},
      method: options.method || 'POST',
      header: { 'content-type': "application/x-www-form-urlencoded" },
      responseType: options.responseType || "",
      timeout: 15000,
      success(res) {
        FN.LoadingOff();
        if (res.statusCode === 200) {
            resolve(res.data);
        } else {
          FN.Toast(res.errMsg);
        };
      },
      fail(res) {
        FN.Toast("网络开小差了");
        reject(res);
      }
    })
  })
};

module.exports = {
  MyRequest
};