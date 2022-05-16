//获取应用实例
const app = getApp()
const FN = require('../../publicFn/public');

Page({
  data: {
    clientHeight: '',
    account: '',
    password: '',
    radio: '0', // 0：学生 1：班干部 2:老师
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })
  },
  // 身份切换
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  //登录事件
  onLogin() {
    let { account, password } = this.data
    console.log(account, password)
    if (account === '') {
      FN.Toast("账号不能为空")
    } else if (password === '') {
      FN.Toast("密码不能为空")
    } else {
      console.log("发送登陆请求！")
      const res = {
        userId: "1",
        role: this.data.radio,
        account: "2018211822",
        userName: "李昊洋",
        classInfo: [
          {
            classId: "04031804",
            className: "一年级五班"
          }
        ],
        sex: "男",
      }
      // // 造假测试
      // switch (account) {
      //   case 'a':
      //     // 学生账号
      //     break;
      //   case 'b':
      //     // 老师账号
      //     break;
      //   case 'c':
      //    // 班干部账号
      //     break;
      //   default:
      //     FN.Toast('请输入正确的账号!')
      //     return
      // }
      if (res) {
        wx.setStorageSync('userInfo', res)
        app.globalData.userInfo = res
        FN.Toast("登陆成功!", 1)
        wx.switchTab({
          url: '/pages/bookshelf/bookshelf'
        })
      }
    }
  },
  // 双向绑定
  onAccountInput(e) {
    this.setData({
      account: e.detail.value
    })
  },
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
})