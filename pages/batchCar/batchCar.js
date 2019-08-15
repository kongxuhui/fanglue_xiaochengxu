// pages/batchCar/batchCar.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingShow: false,
    navdata: [
      { id: 1, approvalDateStr: 'latestDate', name: '最新' }, 
      { id: 2, approvalDateStr: 'latestWeek', name: '近一周' }, 
      { id: 3, approvalDateStr: 'latestMonth', name: '近一月' }, 
      { id: 4, approvalDateStr: 'latestYear', name: '近一年' }, 
      { id: 5, approvalDateStart: '', approvalDateEnd:'', name: '自定义'}
    ],
    currentTab: 0,
    detailId:1,
    titleName: '今日',
    approvalDateStr: 'latestDate',
    trainApproval:{},
    trainApprovalList:[],
    approvalDateStart: '',
    approvalDateEnd: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData: function () {
    this.request('findTotal',this.data.approvalDateStr, this.success_1)
    this.request('findTrainGoodsTotal',this.data.approvalDateStr, this.success_2)
  },
  request: function (funType, approvalDateStr, success, approvalDateStart, approvalDateEnd){
    var postData = {
      transCode: 'STAP01',
      funType: funType,
      approvalDateStr: approvalDateStr,
      approvalDateStart: approvalDateStart,
      approvalDateEnd: approvalDateEnd
    }
    app.wxRequest('post', postData, success, this.error)
  },
  success_1: function (data) {
    this.setData({
      loadingShow: false
    })
    let _this = this;
    if (data.data.code === '000000') {
      this.setData({
        trainApproval: data.data.trainApproval,
        approvalDateStart: data.data.approvalDateStart,
        approvalDateEnd: data.data.approvalDateEnd
      })
    }
  },
  success_2: function (data) {
    this.setData({
      loadingShow: false
    })
    let _this = this;
    if (data.data.code === '000000') {
      this.setData({
        trainApprovalList: data.data.trainApprovalList
      })
    }
  },
  // 跳转批车详情页面
  tapBatchCarDetail: function (e) {
    var that = this;
    if (that.data.detailId !== 5){
      wx.navigateTo({
        url: '../batchCarDetail/batchCarDetail?approvalDateStr=' + that.data.approvalDateStr,
      })
    }else{
      wx.navigateTo({
        url: '../batchCarDetail/batchCarDetail?approvalDateStart=' + that.data.approvalDateStart + '&approvalDateEnd=' + that.data.approvalDateEnd,
      })
    }
  },
  swichNav: function (e) { // tab切换 
    var that = this;
    that.setData({
      loadingShow: true
    })
    console.log(e)
    console.log(that.data.currentTab)

    if (that.data.currentTab === e.currentTarget.dataset.current) {
      that.setData({
        loadingShow: false
      })
      return false;
    } else if (e.currentTarget.dataset.id === 1){
      that.setData({
        currentTab: e.currentTarget.dataset.current,
        detailId: e.currentTarget.dataset.id,
        titleName: '今日',
        approvalDateStr: e.currentTarget.dataset.approval,
      })
      console.log(that.data.approvalDateStr)
      that.request('findTotal', that.data.approvalDateStr, that.success_1)
      that.request('findTrainGoodsTotal', that.data.approvalDateStr, that.success_2)
    } else if (e.currentTarget.dataset.id === 5) {
      this.setData({
        loadingShow: false
      })
      that.setData({
        currentTab: e.currentTarget.dataset.current,
        detailId: e.currentTarget.dataset.id,
        titleName: '此时间段',
        approvalDateStr: ''
      })
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current,
        detailId: e.currentTarget.dataset.id,
        titleName: e.currentTarget.dataset.name,
        approvalDateStr: e.currentTarget.dataset.approval,
      })
      // setTimeout(() => {
      //   console.log(that.data)
        that.request('findTotal', that.data.approvalDateStr, that.success_1)
        that.request('findTrainGoodsTotal', that.data.approvalDateStr, that.success_2)
      // },5000)
    }
  },
  bindDateChange_start: function (e) {
    this.setData({
      approvalDateStart: e.detail.value
    })
  },
  bindDateChange_end: function (e) {
    this.setData({
      approvalDateEnd: e.detail.value
    })
  },
  //自定义日期查询
  bindDateQuery:function(){
    this.setData({
      loadingShow: true
    })
    this.request('findTotal', this.approvalDateStr, this.success_1, this.data.approvalDateStart, this.data.approvalDateEnd)
    this.request('findTrainGoodsTotal', this.approvalDateStr, this.success_2, this.data.approvalDateStart, this.data.approvalDateEnd)
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