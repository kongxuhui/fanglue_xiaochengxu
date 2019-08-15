// pages/phoneLogin/phoneLogin.js
var utils = require('../../utils/getCode.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    param: '',
    isShow: false,//默认按钮1显示，按钮2不显示
    sec: "30",//设定倒计时的秒数
    loadingShow:false,
  },
  formSubmit: function (e) {
    var param = e.detail.value;
    var _this = this;
    this.mysubmit(param);
  },
  mysubmit: function (param) {
    var flag = this.checkphonenumber() && this.checkPassword(param)
    if (flag) {
      this.tabRegister(param);
    }
  },
  tabRegister: function (param){
    this.setData({
      loadingShow: true
    })
    var _this = this;
    var password = Number(param.password);
    let postData = {
      transCode: 'MUSR01',
      funType: 'userLoginOrRegister',
      phone: _this.data.param,
      phoneCode :password
    }
    app.wxRequest('post', postData, this.getData);
  },
  getData:function(data){
    this.setData({
      loadingShow: false
    })
    wx.setStorage({
      key: "userInfo",
      data: data.data.userInfo
    })
    if(data.data.code == '000000'){
      if (data.data.userFlag === '1') {
        wx.navigateTo({
          url: '../resetPassword/resetPassword'
        })
      } else {
        wx.showToast({
          title: '登陆成功',
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
      }
    }else{
      wx.showToast({
        title: '验证码错误',
        icon: 'cancel',
        duration: 1500
      });
      return false;
    }
    
  },
  tabRePasswordLogin: function(e){
    wx.navigateTo({
      url: '../passwordLogin/passwordLogin'
    })
  },
  bindPhone: function(e){
    var linkTel = e.detail.value.replace(/\s/g, "");
    this.setData({
      param: linkTel
    })
  },
  //校验手机号
  checkphonenumber: function () {
    var _this = this;
    if (_this.data.param.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|(19[0-9]{1})|(16[0-9]{1}))+\d{8})$/;

    if (!myreg.test(_this.data.param)) {
      //验证码先注销

      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 1500
      });
      return false;
    }
    return true;
  },
  //校验验证码
  checkPassword: function (param) {
    var password = param.password.trim();

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
    if (phonenumberCheck){
      let postNumber = {
        transCode: 'MVCL01',
        funType: 'sendMobileVelidate',
        phone: _this.data.param,
      }
      app.wxRequest('post', postNumber, this.noWork,this.error)
      utils.getCode(_this, _this.data.sec);//调用倒计时函数
    }
  },
  noWork:function(){
    this.setData({
      loadingShow: false
    })
    wx.showToast({
      title: '发送成功',
      icon: 'success',
      duration: 2000
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