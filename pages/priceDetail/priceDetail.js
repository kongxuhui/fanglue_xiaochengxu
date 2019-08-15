// pages/priceDetail/priceDetail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectData: ['最新', '近一周', '近一月', '近一年'],
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    index: 0,//选择的下拉列表下标
    num:{
      a: '0.8',    
    },
    goodsManagerDetail:{},
    goodsOfferDetailList: {},
    detail: {
      name:'焦炭',
      newDate: '2019-5-30',
      price: '1460',
      gain: '+3',
      address: '国内',
      text: "S硫≤0.8  V灰粉≤0.8  C故性碳≤0.8  CSR反应后强度≤0.8  CRI反映性≤0.8   M25≤0.8   M40≤0.8",
      listData: [
        { "date": "2019-5-29", "price": "1950", "gain": "+3" },
        { "date": "2019-5-29", "price": "1950", "gain": "-2" },
        { "date": "2019-5-29", "price": "1950", "gain": "+1" },
        { "date": "2019-5-29", "price": "1950", "gain": "+3" },
        { "date": "2019-5-29", "price": "1950", "gain": "+3" },
        { "date": "2019-5-29", "price": "1950", "gain": "+3" },
        { "date": "2019-5-29", "price": "1950", "gain": "+3" },
        { "date": "2019-5-29", "price": "1950", "gain": "+3" },
        { "date": "2019-5-29", "price": "1950", "gain": "+3" },
      ],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.id);
  },
  getData: function (id) {
    var postData = {
      transCode: 'SGOD04',
      funType: 'findDetail',
      id: id,
    }
    app.wxRequest('post', postData, this.success, this.error)
  },
  success: function (data) {
    this.setData({
      loadingShow: false
    })
    let _this = this;
    if (data.data.code === '000000') {
      this.setData({
        goodsManagerDetail: data.data.goodsManagerDetail,
        goodsOfferDetailList: data.data.goodsOfferDetailList
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