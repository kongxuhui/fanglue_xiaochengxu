// pages/resetPassword/resetPassword.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd_1: '',
    pwd_2: '',
    pwd_old: '',
    userInfo:{},
    flagJump:false,
    setPwd:'',
    transCode:'',
    phone:'',
  },
  bindPwd_1:function(e){
    this.setData({
      pwd_1: e.detail.value
    })
  },
  bindPwd_2: function(e){
    this.setData({
      pwd_2: e.detail.value
    })
  },
  bindPwd_old: function (e) {
    this.setData({
      pwd_old: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.setPwd){
      this.setData({
        flagJump: true,
        setPwd: options.setPwd
      })
    } else if (options.phone){
      this.setData({
        flagJump: true,
        phone: options.phone
      })
    }
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  tabJump:function() {
    this.setData({
      loadingShow: true
    })
    let _this = this;
    if (_this.data.setPwd == '1') {
      this.setData({
        transCode: 'MUSR04'
      })
      var postData = {
        transCode: _this.data.transCode,
        funType: 'updatePwd',
        userId: _this.data.userInfo.userId,
        loginPwd: _this.data.pwd_1,
      }
    } else if (_this.data.setPwd == '2') {
      this.setData({
        transCode: 'MUSR05'
      })
      var postData = {
        transCode: _this.data.transCode,
        funType: 'updatePwd',
        userId: _this.data.userInfo.userId,
        loginOldPwd: _this.data.pwd_old,
        loginNewPwd: _this.data.pwd_1,
      }
    } else if (_this.data.phone) {
      this.setData({
        transCode: 'MUSR08'
      })
      var postData = {
        transCode: _this.data.transCode,
        funType: 'findUserByPhone',
        phone: _this.data.phone,
        loginPwd: _this.data.pwd_1,
      }
    }
    if (_this.data.pwd_1 === _this.data.pwd_2){
      app.wxRequest('post', postData, this.getData, this.error)
    }else{
      wx.showToast({
        title: '两次输入密码不一致，请重新输入',
        icon: 'cancel',
        duration: 1500
      });
    }
    
  },
  getData: function (data) {
    this.setData({
      loadingShow: false
    })
    let _this = this;
    if (data.data.code === '000000') {
      wx.setStorage({
        key: "userInfo",
        data: data.data.user
      })
      if (_this.data.setPwd || _this.data.phone){
        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 1500,
          success: function () {
            setTimeout(function () {
              wx.hideLoading({
                success: function () {
                  wx.switchTab({
                    url: '../personCenter/personCenter'
                  })
                }
              })
            }, 1500)
          }
        })
      }else{
        wx.navigateTo({
          url: '../regSuccess/regSuccess'
        })
      }
    } else if (data.data.code === 'CE1101'){
      wx.showToast({
        title: '旧密码输入错误，请重新输入',
        icon: 'cancel',
        duration: 1500
      });
    }
  },
  tabNext:function(){
    wx.navigateTo({
      url: '../regSuccess/regSuccess'
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