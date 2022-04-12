const FN = require("../../publicFn/public")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    searchInput: '',
    allBook: [],
    classBookList: [],
    addPopShow: false,
    currentClassId: ''
  },
  /* 取消添加书籍 */
  onCancel() {
    this.setData({
      addPopShow: false
    })
  },
  /* 添加书籍确认 */
  onConfirm(e) {
    const { value, index } = e.detail;
    console.log(this.data.allBook[index].bookId, this.data.currentClassId)
    console.log('根据书本id 和 班级id 去添加选中书籍到选中班级的书单')
    FN.Toast(`添加成功`);
  },
  /* 搜索 */
  search() {
    FN.Toast(this.data.searchInput)
  },
  /* 搜索框双向绑定 */
  searchInput(event) {
    this.setData({
      searchInput: event.detail
    })
  },
  /* tab切换 */
  onTabClick(e) {
    console.log(e.detail)
  },
  /* 打开弹出层添加书籍 */
  addBook(e) {
    this.setData({
      addPopShow: true,
      currentClassId: e.currentTarget.dataset.classid
    })
    // console.log(this.data.currentClassId)
  },
  /* 关闭弹出层 */
  onPopClose() {
    this.setData({
      addPopShow: false
    })
  },
  /* 页面初始化 */
  init() {
    console.log('发送请求，获取书架列表')
    console.log('发送请求，根据老师id请求班级书单列表')
    // 请求过来的假数据
    this.setData({
      allBook: [{
          bookId: '10',
          coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/173/926173/t6_926173.jpg',
          bookName: '红楼梦'
        },
        {
          bookId: '11',
          coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/509/787509/t6_787509.jpg',
          bookName: '钢铁是怎么炼成的'
        },
        {
          bookId: '12',
          coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/49/31301049/t6_31301049.jpg',
          bookName: '简爱'
        },
        {
          bookId: '13',
          coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/417/139417/t6_139417.jpg',
          bookName: '三国演义'
        }
      ],
      classBookList: [{
          classId: '04031802',
          className: "二年级三班",
          bookList: [{
              bookId: '12',
              coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/49/31301049/t6_31301049.jpg',
              bookName: '简爱'
            },
            {
              bookId: '13',
              coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/417/139417/t6_139417.jpg',
              bookName: '三国演义'
            }
          ]
        },
        {
          classId: '04031804',
          className: "一年级五班",
          bookList: [{
              bookId: '10',
              coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/173/926173/t6_926173.jpg',
              bookName: '红楼梦'
            },
            {
              bookId: '11',
              coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/509/787509/t6_787509.jpg',
              bookName: '钢铁是怎么炼成的'
            }
          ]
        },
      ]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const app = getApp()
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})