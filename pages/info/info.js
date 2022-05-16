// 获取用户的基本信息
const app = getApp();
const FN = require('../../publicFn/public');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null, // 用户的基本信息
    teacherClasses: '', // 老师管理的班级
    tipShow: false, // 提示对话框
    fix: true, // 修复vant组件库bug
  },
  // 退出登陆
  logout() {
    this.setData({
      tipShow: true,
      fix: false
    })
  },
  // 取消退出
  onCancel() {
    this.setData({
      fix: true,
      tipShow: false
    })
  },
  
  // 前往点赞文章列表
  goToThumbList() {
    app.globalData.isThumbList = true;
    wx.switchTab({
      url: `/pages/communication/communication`
    })
  },
  // 确认退出
  onConfirm() {
    this.setData({
      fix: true,
      tipShow: false
    })
    // 清空缓存
    app.globalData.userInfo = null;
    wx.setStorageSync('userInfo', null)
    wx.reLaunch({
      url: '/pages/login/login'
    })
  },
  // 初始化函数
  init() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    if (this.data.userInfo.role === '2' && this.data.userInfo.classInfo.length != 0) {
      let teacherClasses = '';
      for (let item of this.data.userInfo.classInfo) {
        teacherClasses = teacherClasses + item.className + ',';
      }
      console.log(teacherClasses);
      this.setData({
        teacherClasses
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})