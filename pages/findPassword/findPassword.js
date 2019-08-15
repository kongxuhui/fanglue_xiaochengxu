// pages/phoneLogin/phoneLogin.js
var utils = require('../../utils/getCode.js')
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    code: '',
    isShow: false,//默认按钮1显示，按钮2不显示
    sec: "30",//设定倒计时的秒数
    isSee01: false,
    loadingShow: false,
  },
  bindPhone: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  tabNext: function () {
    let _this = this;
    let postData = {
      transCode: 'MVCL01',
      funType: 'chkPhoneCode',
      phone: _this.data.mobile,
      phoneCode: _this.data.code,
    }
    if(this.checkphonenumber() && this.checkPassword()){
      app.wxRequest('post', postData, this.getData, this.error)
    }
  },
  getData: function (data) {
    let _this = this;
    _this.setData({
      loadingShow: false
    })
    if (data.data.code == '000000') {
      wx.navigateTo({
        url: '../resetPassword/resetPassword?phone=' + _this.data.mobile
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
  //校验手机号
  checkphonenumber: function () {
    var _this = this;
    console.log(_this.data.mobile.length);
    if (_this.data.mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'cancel',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|(19[0-9]{1})|(16[0-9]{1}))+\d{8})$/;

    if (!myreg.test(_this.data.mobile)) {
      wx.showToast({
        title: '手机号有误',
        icon: 'cancel',
        duration: 1500
      });
      return false;
    }
    return true;
  },
  //校验验证码
  checkPassword: function () {
    let _this = this;
    var password = _this.data.code.trim();
    if (password.length <= 0) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'success',
        duration: 1500
      });
      return false;
    }
    else {
      return true;
    }
  },
  //获取验证码
  getCode: function (e) {
    var _this = this;
    _this.setData({
      loadingShow: true
    })
    var phonenumberCheck = _this.checkphonenumber();
    if (phonenumberCheck) {
      let postNumber = {
        transCode: 'MVCL01',
        funType: 'sendMobileVelidate',
        phone: _this.data.mobile,
      }
      app.wxRequest('post', postNumber, this.noWork, this.error)
      utils.getCode(_this, _this.data.sec);//调用倒计时函数
    }
  },
  noWork: function () {
    this.setData({
      loadingShow: false
    })
    wx.showToast({
      title: '发送成功',
      icon: 'success',
      duration: 2000
    })
  },
  error: function () {
    wx.showToast({
      title: '校验失败,请检查网路设置',
      icon: 'cancel',
      duration: 1500
    });
    return false;
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