// pages/price/price.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsManagerDetailList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options){
      this.getData(options.name);
    }else{
      this.getData();
    }
  },
  getData: function (name){
    var postData = {
      transCode: 'SGOD01',
      funType: 'findAll',
      // categoryName: name,
      categoryOrGoodsName: name,
      parentId: 0,
    }
    app.wxRequest('post', postData, this.success, this.error)
  },
  success: function (data) {
    this.setData({
      loadingShow: false
    })
    let _this = this;
    let arr1 = [];
    if (data.data.code === '000000') {
      var arr = data.data.goodsCategoryList;
      new Promise((resolve, reject) => {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].childGoodsManagerDetail.length != 0) {
            arr1.push(arr[i])
          }
        }
        resolve(arr1);
      }).then(function (arr1) {
        _this.setData({
            goodsManagerDetailList: arr1
        })
      })
    }
  },
  tapPriceDetail: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../priceDetail/priceDetail?id=' + id,
    })
  },
  tel: function() {
    wx.makePhoneCall({
      phoneNumber: '400-8888-88888' //仅为示例，并非真实的电话号码
    })
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