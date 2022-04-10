// app.js
App({
  onLaunch() {

    // 检验是否有本地缓存数据
    if (wx.getStorageSync('userInfo')) {
      this.globalData.userInfo = wx.getStorageSync('userInfo')
    }
    console.log(this.globalData.userInfo)
  },
  globalData: {
    userInfo: null,
    /* 数据服务器URL */
    // baseURL: '192.168.xxx.xxx:8080'
    baseURL: 'https://api.zhuishushenqi.com'
  }
})
