const FN = require("../../publicFn/public")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNamesL: [], // 文章内容展开激活列表
    articleList: null, // 文章列表
  },

  // 文章内容展开
  onContentOpen(e) {
    this.setData({
      activeNames: e.detail,
    });
  },

  // 点赞成功和点赞取消
  onThumb(e) {
    // console.log(e.currentTarget.dataset); // 获得文章id 和 文章列表数据的索引
    console.log(`根据文章id：${e.currentTarget.dataset.articleid}, 发送请求改变当前用户的点赞状态`); 
    let _articleList = this.data.articleList;
    _articleList[e.currentTarget.dataset.index].isThumb = !_articleList[e.currentTarget.dataset.index].isThumb;
    if(_articleList[e.currentTarget.dataset.index].isThumb) {
      _articleList[e.currentTarget.dataset.index].thumbNum = _articleList[e.currentTarget.dataset.index].thumbNum * 1 + 1;
    }
    if(!_articleList[e.currentTarget.dataset.index].isThumb && _articleList[e.currentTarget.dataset.index].thumbNum > 0) {
      _articleList[e.currentTarget.dataset.index].thumbNum = _articleList[e.currentTarget.dataset.index].thumbNum * 1 - 1;
    }
    this.setData({
      articleList: _articleList
    })
  },

  // 前往该条文章的评论界面
  goToComment(e) {
    wx.navigateTo({
      url: `/pages/comment/comment?articleId=${e.currentTarget.dataset.articleid}`
    })
  },

  // 初始化函数
  init() {
    console.log(`发送请求获取文章列表数据`);
    const res = [
      {
        articleId: '87',
        title: '赵子龙的非凡勇气',
        publishTime: '2022-4-12 4:34',
        content: '<p><img src="https://img0.baidu.com/it/u=3152845972,1929328338&fm=253&fmt=auto&app=138&f=JPEG?w=375&h=500" alt="" data-href="https://img0.baidu.com/it/u=3152845972,1929328338&fm=253&fmt=auto&app=138&f=JPEG?w=375&h=500" style=""/></p><p><span style="color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-size: 12px; font-family: consolas, &quot;lucida console&quot;, &quot;courier new&quot;, monospace;">&nbsp;当细细地品读完一本名著后，想必你有不少可以分享的东西，这时最关键的读后感不能忘了哦。想必许多人都在为如何写好读后感而烦恼吧，下面是小编为大家收集的三国演义读后感（精选40篇），希望对大家有所帮助。</span></p>',
        userInfo: {
          userId: '111',
          role: '0',
          userName: '李老三',
          classInfo: [{
            className: '一年级五班',
            calssId: '04031804'
          }]
        },
        isThumb: false,
        thumbNum: '0',
        commentNum: '10'
      },
      {
        articleId: '88',
        title: '曹操到底是不是枭雄',
        publishTime: '2022-4-12 4:34',
        content: '<p><img src="https://img0.baidu.com/it/u=3152845972,1929328338&fm=253&fmt=auto&app=138&f=JPEG?w=375&h=500" alt="" data-href="https://img0.baidu.com/it/u=3152845972,1929328338&fm=253&fmt=auto&app=138&f=JPEG?w=375&h=500" style=""/></p><p><span style="color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-size: 12px; font-family: consolas, &quot;lucida console&quot;, &quot;courier new&quot;, monospace;">&nbsp;当细细地品读完一本名著后，想必你有不少可以分享的东西，这时最关键的读后感不能忘了哦。想必许多人都在为如何写好读后感而烦恼吧，下面是小编为大家收集的三国演义读后感（精选40篇），希望对大家有所帮助。</span></p>',
        userInfo: {
          userId: '112',
          role: '1',
          userName: '李老四',
          classInfo: [
            {
              className: '一年级五班',
              calssId: '04031804'
            }
          ]
        },
        isThumb: true,
        thumbNum: '1',
        commentNum: '0'
      },
      {
        articleId: '89',
        title: '三国演义',
        publishTime: '2022-4-12 4:34',
        content: '<p><img src="https://img0.baidu.com/it/u=3152845972,1929328338&fm=253&fmt=auto&app=138&f=JPEG?w=375&h=500" alt="" data-href="https://img0.baidu.com/it/u=3152845972,1929328338&fm=253&fmt=auto&app=138&f=JPEG?w=375&h=500" style=""/></p><p><span style="color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-size: 12px; font-family: consolas, &quot;lucida console&quot;, &quot;courier new&quot;, monospace;">&nbsp;当细细地品读完一本名著后，想必你有不少可以分享的东西，这时最关键的读后感不能忘了哦。想必许多人都在为如何写好读后感而烦恼吧，下面是小编为大家收集的三国演义读后感（精选40篇），希望对大家有所帮助。</span></p>',
        userInfo: {
          userId: '114',
          role: '2',
          userName: '陈秀琴',
          classInfo: [
            {
              className: '一年级五班',
              calssId: '04031804'
            },
            {
              className: '二年级三班',
              classId: '04031802'
            }
          ]
        },
        isThumb: false,
        thumbNum: '5',
        commentNum: '4'
      }
    ]
    this.setData({
      articleList: res
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})