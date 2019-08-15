//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputValue:'',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    msgList: [  //公告
      { url: "url", title: "多地首套房贷利率上浮 热点城市渐迎零折扣时代热点城市渐迎零折扣时代" },
      { url: "url", title: "悦如公寓三周年生日趴邀你免费吃喝欢唱" },
      { url: "url", title: "你想和一群有志青年一起过生日嘛？" }
    ],
    pageList01: [
      {
        id: 1,
        image:'../../assets/img01.png',
        title:'1月份全球粗钢产量1.467亿吨 中国产量占比51.12%',
        content: '1月份全球粗钢产量1.467亿吨 中国产量占比51.12%.1月份全球粗钢产量1.467亿吨 中国产量占比51.12%.1月份全球粗钢产量1.467亿吨 中国产量占比51.12%',
        date:'2019-5-27',
      }, 
      {
        id: 2,
        image:'../../assets/img01.png',
        title:'2月份全球粗钢产量1.467亿吨 中国产量占比51.12%',
        content: '2月份全球粗钢产量1.467亿吨 中国产量占比51.12%',
        date:'2019-5-27',
      }, 
      {
        id: 3,
        image:'../../assets/img01.png',
        title:'3月份全球粗钢产量1.467亿吨 中国产量占比51.12%',
        content: '3月份全球粗钢产量1.467亿吨 中国产量占比51.12%',
        date:'2019-5-27',
      }, 
      {
        id: 4,
        image:'../../assets/img01.png',
        title:'4月份全球粗钢产量1.467亿吨 中国产量占比51.12%',
        content: '4月份全球粗钢产量1.467亿吨 中国产量占比51.12%',
        date:'2019-5-27',
      }, 
      {
        id: 5,
        image:'../../assets/img01.png',
        title:'5月份全球粗钢产量1.467亿吨 中国产量占比51.12%',
        content: '5月份全球粗钢产量1.467亿吨 中国产量占比51.12%',
        date:'2019-5-27',
      }
    ],
  },
  //事件处理函数
  // 跳转报价页面
  tapPrice:() => {
    wx.switchTab({
      url: '../price/price',
    })
  },
  // 跳转批车
  tapBatchCar:() => {
    wx.navigateTo({
      url: '../batchCar/batchCar'
    })
  },
  // 跳转资讯详情
  tapInfoDetaile:(e)=>{
    wx.navigateTo({
      // url: 'infoDetail?id=' + e.currentTarget.id
      url: '../infoDetaile/infoDetaile'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //首页搜索
  inputTyping: function (e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },
  //确认
  searchAction: function (e) {
    var that = this;
    if (e.detail.value == "") {
      wx.showToast({
        title: '搜索内容为空',
        duration: 1000
      });
      return false;
    } else {
      wx.reLaunch({
        url: '../price/price?name=' + e.detail.value,
      })
      that.setData({
        inputValue: ''
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
