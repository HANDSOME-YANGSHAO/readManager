const FN = require("../../publicFn/public")
const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [],
    minDateTextHeight: {
      minHeight: 32
    },
    remarksInput: null,
    taskOption: [{
      text: '进行中',
      value: 0
    },
    {
      text: '已截至',
      value: 1
    }
    ],
    statusValue: 0,
    classList: null,
    classBookList: null,
    isTeacher: false,
    isClassCadre: false,
    showAddPage: false,
    popShow: false,
    isClassPicker: true,
    timePopShow: false,
    addTaskForm: {
      classInfo: {
        classId: '',
        className: ''
      },
      bookInfo: {
        bookId: '',
        bookName: ''
      },
      endTime: '',
      remarks: ''
    },
    dialogShow: false, // 确认对话框
    endTime: '', // 非时间戳，用于显示,
    minDate: new Date().getTime(),
    taskList: null, // 任务列表
    showCompletePage: false, // 完成任务界面
    showTaskItem: true, // 解决placeholder的bug
    editorValue: '', // 保存富文本编辑器里面的值
    currentTaskId: '' // 学生或者老师当前选中的任务(等后端写好接口看需要保存的参数)
  },

  // 老师界面事件

  goToClassTask(e) { // 查看班级阅读任务完成的具体情况
    wx.navigateTo({
      url: `/pages/classTask/classTask?taskId=${e.currentTarget.dataset.taskid}`
    })
  },

  deleteTask(e) { // 删除班级的阅读任务
    this.setData({
      currentTaskId: e.currentTarget.dataset.taskid,
      dialogShow: true
    })
  },

  onDialogConfirm() { // 删除任务对话框的确认事件
    console.log(`根据任务id：${this.data.currentTaskId}发送请求删除该条任务`);
    this.setData({
      dialogShow: false
    })
    console.log('重新请求一遍老师的任务列表');
  },

  onDialogCancel() { // 删除任务对话框的取消事件
    this.setData({
      dialogShow: false
    })
  },

  statusChange(e) {
    console.log(`根据任务状态类型:${e.detail}发送请求获取对应的任务列表`);
  },

  onClickShow() {
    this.setData({
      showTaskItem: false,
      showAddPage: true
    });
  },

  onClickHide() {
    this.setData({
      showAddPage: false
    });
    setTimeout(() => {
      this.setData({
        showTaskItem: true
      }, 100);
    })
  },

  popOpen() {
    this.setData({
      popShow: true
    });
  },

  popClose() {
    this.setData({
      popShow: false
    });
  },

  onSelectClass() {
    this.setData({
      isClassPicker: true
    })
    this.popOpen();
  },
  onClassConfirm(event) {
    const {
      value,
      index
    } = event.detail;
    let _addTaskForm = this.data.addTaskForm;
    _addTaskForm.classInfo = value;
    _addTaskForm.bookInfo = {
      bookId: '',
      bookName: ''
    };
    this.setData({
      addTaskForm: _addTaskForm
    })
    this.popClose()
  },
  onClassCancel() {
    this.popClose()
  },

  onSelectBook() {
    this.setData({
      isClassPicker: false
    })

    // 根据选中的班级id去获取班级书单
    if (this.data.addTaskForm.classInfo.classId) {
      console.log(`根据选中的班级id:${this.data.addTaskForm.classInfo.classId}发送请求获取班级书单列表`);
      if (this.data.addTaskForm.classInfo.classId === '04031802') {
        const _classBookList = [{
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
        this.setData({
          classBookList: _classBookList
        })
      } else {
        const _classBookList = [{
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
        this.setData({
          classBookList: _classBookList
        })
      }
    } else {
      FN.Toast(`请先选择班级`);
      return
    }
    this.popOpen();
  },
  onBookConfirm(event) {
    const {
      value,
      index
    } = event.detail;
    let _addTaskForm = this.data.addTaskForm;
    _addTaskForm.bookInfo = value;
    this.setData({
      addTaskForm: _addTaskForm
    })
    this.popClose()
  },
  onSelectBookCancel() {
    this.popClose();
  },

  onSelectTime() {
    this.setData({
      timePopShow: true
    })
  },
  timePopClose() {
    this.setData({
      timePopShow: false
    })
  },
  onTimeConfirm(e) {
    let _addTaskForm = this.data.addTaskForm;
    _addTaskForm.endTime = e.detail;
    this.setData({
      addTaskForm: _addTaskForm,
      endTime: util.formatTime(e.detail / 1000, 'Y-M-D h:m')
    })
    this.timePopClose();
  },

  remarksInput(e) {
    this.data.remarksInput(e);
  },

  onSubmitTask() {
    // 根据表单生成请求参数
    const params = {
      classId: this.data.addTaskForm.classInfo.classId,
      bookId: this.data.addTaskForm.bookInfo.bookId,
      endTime: this.data.addTaskForm.endTime,
      remarks: this.data.addTaskForm.remarks,
      userId: app.globalData.userInfo.userId, // 老师id
      createTime: new Date().getTime()
    }
    console.log(`根据表单信息发布阅读任务`);
    console.log(params);
    console.log(this.data.addTaskForm);
    this.onClickHide();
  },

  // 学生界面事件

  toDoListOpen(event) { // 未完成名单展开的事件
    this.setData({
      activeNames: event.detail,
    });
  },

  onTabClick(e) {
    // console.log(e.detail);
    console.log(`根据任务类型:${e.detail.index}发送请求获取任务列表,0-->进行中, 1-->已截至`); // 0-->进行中, 1-->已截至
    let taskList = []
    if (e.detail.index === 0) {
      taskList = [{
        taskId: '1',
        classInfo: {
          classId: '04031804',
          className: '一年级五班'
        },
        doneNum: '2',
        toDoNum: '32',
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
        endTime: util.formatTime(new Date().getTime() / 1000, 'Y-M-D h:m'),
        remarks: '请大家阅读第12章到25章，并写下不少于300字数的读后感',
        bookInfo: {
          bookId: '11',
          bookName: '钢铁是怎么样炼成的',
          coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/509/787509/t6_787509.jpg'
        }
      },
      {
        taskId: '2',
        classInfo: {
          classId: '04031804',
          className: '一年级五班'
        },
        doneNum: '12',
        toDoNum: '28',
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
          },
          {
            userId: '2018211824',
            userName: '叶昌昊'
          }
        ],
        endTime: util.formatTime(new Date().getTime() / 1000, 'Y-M-D h:m'),
        remarks: '请大家阅读第16章到20章，并写下不少于300字数的读后感',
        bookInfo: {
          bookId: '10',
          bookName: '红楼梦',
          coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/173/926173/t6_926173.jpg'
        }
      }
      ]
    } else {
      taskList = [{
        taskId: '2',
        classInfo: {
          classId: '04031804',
          className: '一年级五班'
        },
        doneNum: '40',
        toDoNum: '0',
        toDoList: [
        ],
        endTime: '2022-04-20 20:00',
        remarks: '请大家阅读第1章到16章',
        bookInfo: {
          bookId: '10',
          bookName: '红楼梦',
          coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/173/926173/t6_926173.jpg'
        }
      }]
    }
    this.setData({
      statusValue: e.detail.index,
      taskList
    })
  },

  goToBook(e) { // 跳转到阅读界面 
    // console.log(e.currentTarget.dataset.bookid);
    wx.navigateTo({
      url: `/pages/reader/reader?bookId=${e.currentTarget.dataset.bookid}`
    })
  },

  completeTask(e) { // 完成阅读任务
    // console.log(e.currentTarget.dataset.taskid);
    this.setData({
      showTaskItem: false,
      showCompletePage: true,
      currentTaskId: e.currentTarget.dataset.taskid
    })
    // console.log(this.data.currentTaskId);
  },

  editorInput(e) { // 富文本编辑器
    // console.log(e);
    this.setData({
      editorValue: e.detail.html
    })
    // console.log(this.data.editorValue);
  },

  submitTask() { // 提交任务
    // console.log(this.data.editorValue);
    const params = {
      taskId: this.data.currentTaskId
    }
    console.log(`发送请求提交任务表单，完成阅读任务`, params);
    console.log(`刷新当前任务列表, 重新请求一遍任务列表`);
    const taskList = [{
      taskId: '1',
      classInfo: {
        classId: '04031804',
        className: '一年级五班'
      },
      doneNum: '3',
      toDoNum: '31',
      toDoList: [
        {
          userId: '2018211821',
          userName: '肖惠钟'
        },
        {
          userId: '2018211823',
          userName: '李翔'
        }
      ],
      endTime: util.formatTime(new Date().getTime() / 1000, 'Y-M-D h:m'),
      remarks: '请大家阅读第12章到25章，并写下不少于300字数的读后感',
      bookInfo: {
        bookId: '11',
        bookName: '钢铁是怎么样炼成的',
        coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/509/787509/t6_787509.jpg'
      },
      isDone: true
    },
    {
      taskId: '2',
      classInfo: {
        classId: '04031804',
        className: '一年级五班'
      },
      doneNum: '12',
      toDoNum: '28',
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
        },
        {
          userId: '2018211824',
          userName: '叶昌昊'
        }
      ],
      endTime: util.formatTime(new Date().getTime() / 1000, 'Y-M-D h:m'),
      remarks: '请大家阅读第16章到20章，并写下不少于300字数的读后感',
      bookInfo: {
        bookId: '10',
        bookName: '红楼梦',
        coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/173/926173/t6_926173.jpg'
      },
      isDone: false
    }
    ]
    this.setData({
      taskList
    })
    // 关闭提交任务界面
    this.onCompletePageHide();
  },


  onCompletePageHide() { // 关闭完成阅读任务界面
    this.setData({
      showCompletePage: false
    })
    setTimeout(() => {
      this.setData({
        showTaskItem: true
      })
    }, 100)
  },

  init() {
    if (app.globalData.userInfo.role === '2') { // 老师界面初始化操作
      this.setData({
        isTeacher: true
      })

      // 生成防抖事件
      let remarksInput = (e) => {
        console.log('触发');
        let _addTaskForm = this.data.addTaskForm;
        _addTaskForm.remarks = e.detail;
        this.setData({
          addTaskForm: _addTaskForm
        })
      }
      remarksInput = util.debounce(remarksInput, 300)
      this.setData({
        remarksInput
      })

      // 获取老师管理的班级列表
      console.log('发送请求，获取老师管理的班级列表');
      const classList = [{
        classId: '04031802',
        className: "二年级三班"
      },
      {
        classId: '04031804',
        className: "一年级五班"
      }
      ]
      // 获取老师发布的任务列表
      console.log(`根据老师的id:${app.globalData.userInfo.userId}和任务类型代码:${this.data.statusValue}发送请求,获取老师发布的任务列表`);
      const taskList = [{
        taskId: '1',
        classInfo: {
          classId: '04031804',
          className: '一年级五班'
        },
        doneNum: '2',
        toDoNum: '38',
        endTime: util.formatTime(new Date().getTime() / 1000, 'Y-M-D h:m'),
        remarks: '请大家阅读第12章到25章，并写下不少于300字数的读后感',
        bookInfo: {
          bookId: '11',
          bookName: '钢铁是怎么样炼成的',
          coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/509/787509/t6_787509.jpg'
        },
      },
      {
        taskId: '2',
        classInfo: {
          classId: '04031804',
          className: '一年级五班'
        },
        doneNum: '12',
        toDoNum: '28',
        endTime: util.formatTime(new Date().getTime() / 1000, 'Y-M-D h:m'),
        remarks: '请大家阅读第16章到20章，并写下不少于300字数的读后感',
        bookInfo: {
          bookId: '10',
          bookName: '红楼梦',
          coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/173/926173/t6_926173.jpg'
        }
      },
      ]
      this.setData({
        classList,
        taskList
      })

    } else { // 学生界面初始化操作

      // 判断是否是班干部
      if(app.globalData.userInfo.role === '1') {
        this.setData({
          isClassCadre: true
        })
      }

      console.log(`根据学生id:${app.globalData.userInfo.userId}和学生班级id:${app.globalData.userInfo.classInfo[0].classId}以及任务类型:0(进行中)发送请求获取学生班级任务列表`);
      const taskList = [{
        taskId: '1',
        classInfo: {
          classId: '04031804',
          className: '一年级五班'
        },
        doneNum: '2',
        toDoNum: '32',
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
        endTime: util.formatTime(new Date().getTime() / 1000, 'Y-M-D h:m'),
        remarks: '请大家阅读第12章到25章，并写下不少于300字数的读后感',
        bookInfo: {
          bookId: '11',
          bookName: '钢铁是怎么样炼成的',
          coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/509/787509/t6_787509.jpg'
        },
        isDone: false
      },
      {
        taskId: '2',
        classInfo: {
          classId: '04031804',
          className: '一年级五班'
        },
        doneNum: '12',
        toDoNum: '28',
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
          },
          {
            userId: '2018211824',
            userName: '叶昌昊'
          }
        ],
        endTime: util.formatTime(new Date().getTime() / 1000, 'Y-M-D h:m'),
        remarks: '请大家阅读第16章到20章，并写下不少于300字数的读后感',
        bookInfo: {
          bookId: '10',
          bookName: '红楼梦',
          coverSrc: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/173/926173/t6_926173.jpg'
        },
        isDone: false
      }
      ]
      this.setData({
        taskList
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
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