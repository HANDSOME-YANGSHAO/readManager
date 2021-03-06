const FN = require("../../publicFn/public")
const utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myScrollEvent: null,
    bookId: '',
    // 书本章节列表
    chapterList: [],
    cpContent: '',
    currentIndex: 0, //当前章节
    currentTitle: '',
    showPage: false, //请求到数据显示界面
    clientWidth: "",
    clientHeight: "",
    winHeight: "", //窗口高度
    scrollTop: 0,
    readerCss: {
      titleSize: 20,
      contentSize: 16,
      color: '#333', //夜间 #424952
      lineHeight: 60,
      backgroundColor: '#fff', // #C7EDCC 护眼色  #080C10 黑夜
      iconBackgroundColor: '#1296db' // #1296db 正常 #080C10 黑夜
    },
    showMenu: false,
    showChapter: false,
    isDark: false,
    isHuyan: false
  },

  //点击中央打开菜单
  openMenu: function(event) {
    let xMid = this.data.clientWidth / 2;
    let yMid = this.data.clientHeight / 2;
    let x = event.detail.x;
    let y = event.detail.y;
    if ((x > xMid - 150 && x < xMid + 150) && (y < yMid + 150 && y > yMid - 150)) {
      this.setData({
        showMenu: !this.data.showMenu
      });
    }
  },

  showChapter: function() {
    this.setData({
      showChapter: !this.data.showChapter,
      scrollTop: 0
    });
  },

  pickChapter(e) {
    console.log(`根据章节id:${this.data.chapterList[e.currentTarget.dataset.currentindex].chapterId}发送请求获取章节内容`);
    this.getChapterContent(this.data.chapterList[e.currentTarget.dataset.currentindex].chapterId, e.currentTarget.dataset.currentindex);
    this.setData({
      showChapter: false
    })
  },

  getScrollTop: function(event) { //设置读取到文章的具体什么位置
    this.data.myScrollEvent(event)
  },

  toggleDark: function() {
    this.setData({
      isDark: !this.data.isDark
    });
    if (this.data.isDark) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#080C10'
      });
      this.data.readerCss.color = '#696969';
      this.data.readerCss.backgroundColor = '#080C10';
      this.data.readerCss.iconBackgroundColor = '#080C10';
      this.setData({
        readerCss: this.data.readerCss
      });
    } else {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#1296db'
      });
      this.data.readerCss.color = '#333';
      this.data.readerCss.backgroundColor = '#fff';
      this.data.readerCss.iconBackgroundColor = '#1296db';
      this.setData({
        readerCss: this.data.readerCss
      });
    }
  },

  toggleHuyan: function() {
    this.setData({
      isHuyan: !this.data.isHuyan
    });
    if (this.data.isHuyan) {
      this.data.readerCss.color = '#333';
      this.data.readerCss.backgroundColor = '#C7EDCC';
      this.setData({
        readerCss: this.data.readerCss
      });
    } else {
      if (this.data.isDark) {
        this.data.readerCss.backgroundColor = '#080C10';
        this.data.readerCss.color = '#696969';
      } else {
        this.data.readerCss.backgroundColor = '#fff';
        this.data.readerCss.color = '#333';
      }
      this.setData({
        readerCss: this.data.readerCss
      });
    }
  },

  incSize: function() {
    if (this.data.readerCss.titleSize === 30) {
      return
    }
    this.data.readerCss.titleSize = this.data.readerCss.titleSize + 5;
    this.data.readerCss.lineHeight = this.data.readerCss.lineHeight + 10;
    this.data.readerCss.contentSize = this.data.readerCss.contentSize + 5;
    this.setData({
      readerCss: this.data.readerCss
    });
  },

  decSize: function() {
    if (this.data.readerCss.titleSize === 20) {
      return
    }
    this.data.readerCss.titleSize = this.data.readerCss.titleSize - 5;
    this.data.readerCss.contentSize = this.data.readerCss.contentSize - 5;
    this.data.readerCss.lineHeight = this.data.readerCss.lineHeight - 10;
    this.setData({
      readerCss: this.data.readerCss
    });
  },

  goPrev: function() {
    if (this.data.currentIndex === 0) {
      FN.Toast('已经到第一章');
      return
    }
    this.setData({
      currentIndex: this.data.currentIndex - 1,
      scrollTop: 0
    })
    if (this.data.chapterList[this.data.currentIndex]) {
      this.getChapterContent(this.data.chapterList[this.data.currentIndex].chapterId, this.data.currentIndex);
    }
    wx.setStorage({
      key: "bookshelfData",
      data: "value"
    })
  },

  goNext: function() {
    if (this.data.currentIndex === this.data.chapterList.length - 1) { //当前在最后一章
      FN.Toast('已到最新章节');
      return;
    }
    this.setData({
      currentIndex: this.data.currentIndex + 1,
      scrollTop: 0
    });
    if (this.data.chapterList[this.data.currentIndex]) {
      this.getChapterContent(this.data.chapterList[this.data.currentIndex].chapterId, this.data.currentIndex);
    }
  },

  /* 获取章节内容 */
  getChapterContent(chapterId, currentIndex) {
    console.log(`根据文章id:${chapterId}去请求文章章节内容, 当前索引：${currentIndex}`);
    const res = {
      content: `诸子百家之中国儒家经典著作系列：\r\n论语集注论语序说史记世家曰：\"孔子名丘，字仲尼。其先宋人。父叔梁纥，母颜氏。以鲁襄公二十二年，庚戌之岁，十一月庚子，生孔子于鲁昌平乡陬邑。为儿嬉戏，常陈俎豆，设礼容。及长，为委吏，料量平；委吏，本作季氏史。索隐云：\"一本作委吏，与孟子合。\"今从之。为司职吏，畜蕃息。职，见周礼牛人，读为樴，义与杙同，盖系养牺牲之所。此官即孟子所谓乘田。适周，问礼于老子，既反，而弟子益进。昭公二十五年甲申，孔子年三十五，而昭公奔齐，鲁乱。于是适齐，为高昭子家臣，以通乎景公。有闻韶、问政二事。公欲封以尼溪之田，晏婴不可，公惑之。有季孟吾老之语。孔子遂行，反乎鲁。定公元年壬辰，孔子年四十三，而季氏强僭，其臣阳虎作乱专政。故孔子不仕，而退修诗、书、礼、乐，弟子弥众。九年庚子，孔子年五十一。公山不狃以费畔季氏，召，孔子欲往，而卒不行。有答子路东周语。定公以孔子为中都宰，一年，四方则之，遂为司空，又为大司寇。十年辛丑，相定公会齐侯于夹谷，齐人归鲁侵地。十二年癸卯，使仲由为季氏宰，堕三都，收其甲兵。孟氏不肯堕成，围之不克。十四年乙巳，孔子年五十六，摄行相事，诛少正卯，与闻国政。三月，鲁国大治。齐人归女乐以沮之，季桓子受之。郊又不致膰俎于大夫，孔子行。鲁世家以此以上皆为十二年事。适卫，主于子路妻兄颜浊邹家。孟子作颜雠由。适陈，过匡，匡人以为阳虎而拘之。有颜渊后及文王既没之语。既解，还卫，主蘧伯玉家，见南子。有矢子路及未见好德之语。去适宋，司马桓魋欲杀之。有天生德语及微服过宋事。又去，适陈，主司城贞子家。居三岁而反于卫，灵公不能用。有三年有成之语。晋赵氏家臣佛肸以中牟畔，召孔子，孔子欲往，亦不果。有答子路坚白语及荷蒉过门事。将西见赵简子，至河而反，又主蘧伯玉家。灵公问陈，不对而行，复如陈。据论语则绝粮当在此时。季桓子卒，遗言谓康子必召孔子，其臣止之，康子乃召冉求。史记以论语归与之叹为在此时，又以孟子所记叹辞为主司城贞子时语，疑不然。盖语孟所记，本皆此一时语，而所记有异同耳。孔子如蔡及叶。有叶公问答子路不对、沮溺耦耕、荷莜丈人等事。史记云：\"于是楚昭王使人聘孔子，孔子将往拜礼，而陈蔡大夫发徒围之，故孔子绝粮于陈蔡之间。\"有愠见及告子贡一贯之语。按是时陈蔡臣服于楚，若楚王来聘孔子，陈蔡大夫安敢围之。且据论语，绝粮当在去卫如陈之时。楚昭王将以书社地封孔子，令尹子西不可，乃止。史记云\"书社地七百里\"，恐无此理，时则有接舆之歌。又反乎卫，时灵公已卒，卫君辄欲得孔子为政。有鲁卫兄弟及答子贡夷齐、子路正名之语。而冉求为季氏将，与齐战有功，康子乃召孔子，而孔子归鲁，实哀公之十一年丁巳，而孔子年六十八矣。有对哀公及康子语。然鲁终不能用孔子，孔子亦不求仕，乃叙书传礼记。有杞宋、损益、从周等语。删诗正乐，有语大师及乐正之语。序易彖、系、象、说卦、文言。有假我数年之语。弟子盖三千焉，身通六艺者七十二人。弟子颜回最贤，蚤死，后惟曾参得传孔子之道。十四年庚申，鲁西狩获麟，有莫我知之叹。孔子作春秋。有知我罪我等语，论语请讨陈恒事，亦在是年。明年辛酉，子路死于卫。十六年壬戌、四月己丑，孔子卒，年七十三，葬鲁城北泗上。弟子皆服心丧三年而去，惟子贡庐于冢上，凡六年，孔子生鲤，字伯鱼，先卒。伯鱼生急，字子思，作中庸。\"子思学于曾子，而孟子受业子思之门人。何氏曰：\"鲁论语二十篇。齐论语别有问王、知道，凡二十二篇，其二十篇中章句，颇多于鲁论。古论出孔氏壁中，分尧曰下章子张问以为一篇，有两子张，凡二十一篇，篇次不与齐鲁论同。\"程子曰：\"论语之书，成于有子曾子之门人，故其书独二子以子称。\"程子曰：\"读论语：有读了全然无事者；有读了后其中得一两句喜者；有读了后知好之者；有读了后直有不知手之舞之足之蹈之者。\"程子曰：\"今人不会读书。如读论语，未读时是此等人，读了后又只是此等人，便是不曾读。\"程子曰：\"颐自十七八读论语，当时已晓文义。读之愈久，但觉意味深长。\"\r\n　　读论语孟子法据清仿宋大字本补。\r\n　　程子曰：\"学者当以论语孟子为本。论语孟子既治，则六经可不治而明矣。读书者当观圣人所以作经之意，与圣人所以用心，圣人之所以至于圣人，而吾之所以未至者，所以未得者。句句而求之，昼诵而味之，中夜而思之，平其心，易其气，阙其疑，则圣人之意可见矣。\"程子曰：\"凡看文字，须先晓其文义，然后可以求其意。未有不晓文义而见意者也。\"程子曰：\"学者须将论语中诸弟子问处便作自己问，圣人答处便作今日耳闻，自然有得。虽孔孟复生，不过以此教人。若能于语孟中深求玩味，将来涵养成甚生气质！\"程子曰：\"凡看语孟，且须熟读玩味。须将圣人言语切己，不可只作一场话说。人只看得二书切己，终身尽多也。\"程子曰：\"论孟只剩读？便自意足。学者须是玩味。若以语言解？意便不足。\"或问：\"且将论孟紧要处看，如何？\"程子曰：\"固是好，但终是不浃洽耳。\"程子曰：\"孔子言语句句是自然，孟子言语句句是事实。\"程子曰：\"学者先读论语孟子，如尺度权衡相似，以此去量度事物，自然见得长短轻重。\"程子曰：\"读论语孟子而不知道，所谓'虽多，亦奚以为'。\"\r\n　　\r\n`
    }
    this.setData({
      cpContent: res.content,
      currentTitle: this.data.chapterList[currentIndex].title
    })
    // console.log(this.data.cpContent, currentTitle);

    wx.setNavigationBarTitle({ //设置标题
      title: this.data.chapterList[currentIndex].title
    });

    // 添加书本阅读记录本地缓存
    let bookshelfData = wx.getStorage({
      key: 'bookshelfData',
      success: (res) => {
        let this_book = res.data.find((item) =>
          item.bookId === this.data.bookId
        )
        if (this_book) {  
          for (let obj of res.data) {
            if (obj.bookId === this.data.bookId) {
              obj.chapterId = chapterId
              obj.currentIndex = currentIndex
            }
          }
        } else {
          res.data.push({
            bookId: this.data.bookId,
            chapterId: chapterId,
            currentIndex: currentIndex
          })
        }
        wx.setStorageSync('bookshelfData', res.data)
      },
      fail: (res) => {
        let _bookshelfData = [{
          bookId: this.data.bookId,
          chapterId: chapterId,
          currentIndex: currentIndex
        }]
        // console.log(_bookshelfData);
        wx.setStorageSync('bookshelfData', _bookshelfData)
      }
    })
  },

  /* 初始化 */
  init() {
    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        this.setData({
          clientHeight: clientHeight,
          clientWidth: clientWidth,
          winHeight: calc
        });
        // console.log(this.data);
      }
    });

    // 添加滚动条防抖事件
    let myScrollEvent = (event) => {
      // console.log('防抖滚动事件触发');
      //存储读到章节的什么位置
      wx.getStorage({
        key: 'bookshelfData',
        success: res => {
          let data = res.data;
          for (let obj of data) {
            if (this.data.bookId === obj.bookId) {
              obj.laterScrollTop = event.detail.scrollTop;
              wx.setStorage({
                key: 'bookshelfData',
                data
              })
            }
          }
        },
      });
    }
    myScrollEvent = utils.debounce(myScrollEvent, 100)
    this.setData({
      myScrollEvent
    })

    console.log(`根据bookId:${this.data.bookId}发送请求，获取书本的章节列表`);
    const res = {
      bookId: '10',
      chapterList: [{
          chapterId: '100',
          title: '第一回：测试第一回'
        },
        {
          chapterId: '101',
          title: '第二回：测试第二回'
        },
        {
          chapterId: '102',
          title: '第三回：测试第三回'
        },
        {
          chapterId: '103',
          title: '第四回：测试第四回'
        }
      ]
    }
    this.setData({
      chapterList: res.chapterList
    })
    // console.log(this.data.chapterList);


    // 查看是否有本地阅读缓存
    wx.getStorage({
      key: 'bookshelfData',
      success: (res) => {
        console.log('有缓存');
        let this_book = res.data.find((item) =>
          item.bookId === this.data.bookId
        )
        if (this_book) {
          this.setData({
            currentIndex: this_book.currentIndex
          })
          this.getChapterContent(this_book.chapterId, this_book.currentIndex);
          if(this_book.laterScrollTop) {
            this.setData({
              scrollTop: this_book.laterScrollTop
            })
          }
        } else {
          // 默认获取第一章
          this.getChapterContent(this.data.chapterList[this.data.currentIndex].chapterId, this.data.currentIndex);
        }
      },
      fail: (res) => {
        console.log('没缓存');
        // 默认获取第一章
        this.getChapterContent(this.data.chapterList[this.data.currentIndex].chapterId, this.data.currentIndex);
      }
    })

    // 请求到数据显示页面
    this.setData({
      showPage: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      bookId: options.bookId
    })
    this.init();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

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