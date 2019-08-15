// pages/personCenter/personCenter.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: false,
    userInfo:{},
    getCodeBtnTxt:'设置密码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onShow();
    if (Boolean(wx.getStorageSync('userInfo'))){
      this.setData({
        login: true
      })
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
    }else{
      this.setData({
        login: false
      })
    }
  },
  // 进入注册页面
  onGotUserInfo: function (e) {
    wx.getSetting({
      success(res) {
        
      }
    })
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  //修改密码
  tabResetPassword: function() {
    let _this = this;
    if(_this.data.getCodeBtnTxt == '设置密码'){
      wx.navigateTo({
        url: '../resetPassword/resetPassword?setPwd=1'
      })
    }else{
      wx.navigateTo({
        url: '../resetPassword/resetPassword?setPwd=2'
      })
    }
  },
  
  // 进入登录页面
  tabLogin: function(e){
    wx.navigateTo({
      url: '../phoneLogin/phoneLogin'
    })
  },
  tabPersonalInfo: () => {
    wx.navigateTo({
      url: '../editPersonalInfo/editPersonalInfo'
    })
  },
  goout: function() {
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '确定要退出么？',
      success(res) {
        if (res.confirm) {
          _this.setData({
            login: false
          })
          wx.clearStorage()
        } else if (res.cancel) {
          return false
        }
      }
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
    if (Boolean(wx.getStorageSync('userInfo'))) {
      this.setData({
        login: true
      })
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
      if (this.data.userInfo.loginPwd !== ''){
        this.setData({
          getCodeBtnTxt: '修改密码'
        })
      }
    } else {
      this.setData({
        login: false
      })
    }
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