const FN = require("../../publicFn/public")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleId: '', // 文章id
    userInfo: null, // 当前用户信息
    commentInputValue: '', // 当前评论输入值
    commentList: null, // 评论列表数据
  },

  submitComment() { // 发布评论事件
    if(!this.data.commentInputValue) {
      FN.Toast('评论内容不能够为空！')
      return
    }
    console.log(`根据文章id：${this.data.articleId} 和 输入的评论发送请求`);
    console.log(this.data.commentInputValue);
    this.setData({
      commentInputValue: ''
    })
    console.log('发出请求重新请求一遍列表数据,刷新刚刚发出的评论');
  },

  // 点赞成功和点赞取消
  onThumb(e) {
    console.log(`根据评论id：${e.currentTarget.dataset.commentid}, 发送请求改变当前用户的点赞状态`); 
    let commentList = this.data.commentList;
    commentList[e.currentTarget.dataset.index].isThumb = !commentList[e.currentTarget.dataset.index].isThumb;
    if(commentList[e.currentTarget.dataset.index].isThumb) {
      commentList[e.currentTarget.dataset.index].thumbNum = commentList[e.currentTarget.dataset.index].thumbNum * 1 + 1;
    }
    if(!commentList[e.currentTarget.dataset.index].isThumb && commentList[e.currentTarget.dataset.index].thumbNum > 0) {
      commentList[e.currentTarget.dataset.index].thumbNum = commentList[e.currentTarget.dataset.index].thumbNum * 1 - 1;
    }
    this.setData({
      commentList
    })
  },

  // 初始化
  init() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.log(`根据文章id: ${this.data.articleId}, 发送请求，获取文章的评论列表`);
    const res = [
      {
        commentId: '666',
        publishTime: '2022-4-1 18:06',
        userInfo: {
          userName: '小李',
          userId: '2018211822',
          role: '0',
          classInfo: [
            {
              classId: '04031802',
              className: '二年级三班'
            }
          ]
        },
        isThumb: false,
        thumbNum: '8',
        commentContent: '《三国演义》讲的是三个英雄好汉灭黄巾从而创立蜀国，又出现三国鼎立而又归西晋的故事，细致生动的写出了魏蜀吴之间错综复杂的军事、政治斗争。而且，以曹操、刘备、张飞、关羽、孙权、诸葛亮等艺术典型的数百个栩栩如生的艺术形象，以决然不同的方式写下了自己独特的一页，并由此将三国时代波澜壮阔的历史背景和社会背景展现在我们面前。读完这本书你会有一种奇异的感觉，要想读第二遍。读时会有种身临其境的感觉，仿佛你就生在那个时代，你就在和他们一起杀敌，你就在感受着他们的英雄情怀。不光如此，在你读第一遍时有一种感受，读第二遍是由有另一种感受，在读又有新感受。每一遍都有不同的感受和收获。'
      },
      {
        commentId: '667',
        publishTime: '2022-4-1 18:06',
        userInfo: {
          userName: '小张',
          userId: '2018211823',
          role: '1',
          classInfo: [
            {
              classId: '04031802',
              className: '二年级三班'
            }
          ]
        },
        isThumb: true,
        thumbNum: '1',
        commentContent: '小张评论的内容'
      },
      {
        commentId: '668',
        publishTime: '2022-4-1 18:06',
        userInfo: {
          userName: '小谢',
          userId: '2018211824',
          role: '2',
          classInfo: [
            {
              classId: '04031802',
              className: '二年级三班'
            }
          ]
        },
        isThumb: false,
        thumbNum: '4',
        commentContent: '小谢的评论'
      },
      {
        commentId: '669',
        publishTime: '2022-4-1 18:06',
        userInfo: {
          userName: '小五',
          userId: '2018211822',
          role: '2',
          classInfo: [
            {
              classId: '04031802',
              className: '二年级三班'
            }
          ]
        },
        isThumb: true,
        thumbNum: '8',
        commentContent: '小五的评论'
      },
      {
        commentId: '670',
        publishTime: '2022-4-1 18:06',
        userInfo: {
          userName: '小可',
          userId: '2018211822',
          role: '0',
          classInfo: [
            {
              classId: '04031802',
              className: '二年级三班'
            }
          ]
        },
        isThumb: false,
        thumbNum: '4',
        commentContent: '小可的评论'
      }
    ]
    this.setData({
      commentList: res
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options.articleId);
    this.setData({
      articleId: options.articleId
    })
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