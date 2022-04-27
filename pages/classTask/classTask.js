// pages/classTask/classTask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskId: '', // 当前任务ID
    currentStudentId: '', // 现在选中的学生id
    currentHomeWorkInfo: null, // 当前选中的作业数据
    activeNames: [], // 未完成名单的下拉框
    taskInfo: null, // 任务信息
    showTaskDetail: false, // 任务详情界面遮罩层,
  },

  // 展开/关闭 未完成名单
  toDoListOpen(e) {
    this.setData({
      activeNames: e.detail,
    });
  },

  // 打开检查作业的窗口
  checkTask(e) {
    console.log(`根据当前选中的学生id：${e.currentTarget.dataset.userid} 和 任务id：${this.data.taskId}, 发送请求获取当前任务作业的详情数据`);
    const res = { // 选中学生当条任务对应的阅读任务作业详情 
      homeWorkId: '666',
      homeWorkContent: '<p><img src="https://img0.baidu.com/it/u=3152845972,1929328338&fm=253&fmt=auto&app=138&f=JPEG?w=375&h=500" alt="" data-href="https://img0.baidu.com/it/u=3152845972,1929328338&fm=253&fmt=auto&app=138&f=JPEG?w=375&h=500" style=""/></p><p><span style="color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-size: 12px; font-family: consolas, &quot;lucida console&quot;, &quot;courier new&quot;, monospace;">&nbsp;当细细地品读完一本名著后，想必你有不少可以分享的东西，这时最关键的读后感不能忘了哦。想必许多人都在为如何写好读后感而烦恼吧，下面是小编为大家收集的三国演义读后感（精选40篇），希望对大家有所帮助。</span></p> '
    }
    this.setData({
      currentStudentId: e.currentTarget.dataset.userid,
      currentHomeWorkInfo: res,
      showTaskDetail: true
    })
  },

  // 关闭检查作业的窗口
  onDetailClose() {
    console.log(`根据当前阅读作业id: ${this.data.currentHomeWorkInfo.homeWorkId},去发送请求改变这条作业的检查状态`)
    console.log(`根据任务id：${this.data.taskId}, 发送请求获取刷新检查状态之后 的 阅读任务的代办列表 和 已办列表`);
    const res = {
      toDoList: [
        {
          userId: '2018211822',
          userName: '李昊洋'
        },
        {
          userId: '2018211821',
          userName: '肖惠钟'
        },
        {
          userId: '2018211823',
          userName: '李翔'
        }
      ],
      doneList: [
        {
          userId: '333',
          userName: '张三',
          role: '0',
          isChecked: true
        },
        {
          userId: '222',
          userName: '王二',
          role: '0',
          isChecked: false
        },
        {
          userId: '22213',
          userName: '王二',
          role: '1',
          isChecked: false
        },
        {
          userId: '555',
          userName: '王五',
          role: '0',
          isChecked: false
        },
        {
          userId: '55125',
          userName: '王五',
          role: '0',
          isChecked: false
        }
      ]
    };
    this.setData({
      taskInfo: res,
      showTaskDetail: false
    })
  },

  // 初始化函数
  init() {
    console.log(`根据任务id：${this.data.taskId}, 发送请求获取阅读任务的代办列表 和 已办列表`);
    const res = {
      toDoList: [
        {
          userId: '2018211822',
          userName: '李昊洋'
        },
        {
          userId: '2018211821',
          userName: '肖惠钟'
        },
        {
          userId: '2018211823',
          userName: '李翔'
        }
      ],
      doneList: [
        {
          userId: '333',
          userName: '张三',
          role: '0',
          isChecked: false
        },
        {
          userId: '222',
          userName: '王二',
          role: '0',
          isChecked: false
        },
        {
          userId: '22213',
          userName: '王二',
          role: '1',
          isChecked: false
        },
        {
          userId: '555',
          userName: '王五',
          role: '0',
          isChecked: false
        },
        {
          userId: '55125',
          userName: '王五',
          role: '0',
          isChecked: false
        }
      ]
    };
    this.setData({
      taskInfo: res
    })
    console.log(res);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      taskId: options.taskId
    })
    // console.log(this.data.taskId);
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