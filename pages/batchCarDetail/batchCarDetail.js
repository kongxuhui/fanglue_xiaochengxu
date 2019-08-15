// pages/batchCarDetail/batchCarDetail.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    approvalDateStr:'',
    loadingShow: true,
    trainApprovalDetailList:[],
    batchCarList:[
      {
        id: 1,
        a:{
          name: '方略陆港集团有限公司'
        },
        date: '5-28',
        name_1: '钢管（敞车）',
        chandi: '山西立恒钢铁股份有限公司',
        duandao: '客户自有车辆',
        daozhan:'拉萨西（青）',
        shouhuo: '西藏金达物流有限公司',
        xu:'15',
        bao: '20',
        pi: '25',
      },
      {
        id: 1,
        name: '方略陆港集团有限公司',
        date: '5-28',
        name_1: '钢管（敞车）',
        chandi: '山西立恒钢铁股份有限公司',
        duandao: '客户自有车辆',
        daozhan: '拉萨西（青）',
        shouhuo: '西藏金达物流有限公司',
        xu: '15',
        bao: '20',
        pi: '25',
      },
      {
        id: 1,
        name: '方略陆港集团有限公司',
        date: '5-28',
        name_1: '钢管（敞车）',
        chandi: '山西立恒钢铁股份有限公司',
        duandao: '客户自有车辆',
        daozhan: '拉萨西（青）',
        shouhuo: '西藏金达物流有限公司',
        xu: '15',
        bao: '20',
        pi: '25',
      },
      {
        id: 1,
        name: '方略陆港集团有限公司',
        date: '5-28',
        name_1: '钢管（敞车）',
        chandi: '山西立恒钢铁股份有限公司',
        duandao: '客户自有车辆',
        daozhan: '拉萨西（青）',
        shouhuo: '西藏金达物流有限公司',
        xu: '15',
        bao: '20',
        pi: '25',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.approvalDateStr){
      this.getData(options.approvalDateStr);
    }else{
      this.getData(this.data.approvalDateStr,options.approvalDateStart, options.approvalDateEnd);
    }
  },
  getData: function (approvalDateStr, approvalDateStart, approvalDateEnd) {
    this.request('findAll', approvalDateStr, this.success, approvalDateStart, approvalDateEnd)
  },
  request: function (funType, approvalDateStr, success, approvalDateStart, approvalDateEnd) {
    var postData = {
      transCode: 'STAP02',
      funType: funType,
      approvalDateStr: approvalDateStr,
      approvalDateStart: approvalDateStart,
      approvalDateEnd: approvalDateEnd
    }
    app.wxRequest('post', postData, success, this.error)
  },
  success: function (data) {
    this.setData({
      loadingShow: false
    })
    let _this = this;
    if (data.data.code === '000000') {
      _this.setData({
        trainApprovalDetailList: data.data.trainApprovalDetailList
      })
    }
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