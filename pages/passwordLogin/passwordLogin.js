// pages/resetPassword/resetPassword.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logId:'',
    logPwd:'',
  },
  bindId:function(e){
    this.setData({
      logId: e.detail.value
    })
  },
  bindPwd:function(e){
    this.setData({
      logPwd: e.detail.value
    })
  },
  tabLogin:function(e){
    this.setData({
      loadingShow: true
    })
    let _this = this;
    var postData = {
      transCode: 'MUSR01',
      funType: 'userLogin',
      loginName: _this.data.logId,
      loginPwd: _this.data.logPwd,
    }
    app.wxRequest('post', postData, this.getData, this.error)
  },
  error: function(){
    wx.showToast({
      title: '校验失败,请检查网路设置',
      icon: 'cancel',
      duration: 1500
    });
    return false;
  },
  getData: function (data) {
    this.setData({
      loadingShow: false
    })
    wx.setStorage({
      key: "userInfo",
      data: data.data.userInfo
    })
    if (data.data.code == '000000') {
      wx.showToast({
        title: '登陆成功',
        icon: 'success',
        duration: 1500,
        success:function(){
          setTimeout(function () {
            wx.hideLoading({
              success:function(){
                wx.switchTab({
                  url: '../personCenter/personCenter'
                })
              }
            })
          }, 1500)
        }
      })
    } else {
      wx.showToast({
        title: data.data.message,
        icon: 'cancel',
        duration: 1500
      });
      return false;
    }
  },
  tabForgetPassword: function(){
    wx.navigateTo({
      url: '../findPassword/findPassword',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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