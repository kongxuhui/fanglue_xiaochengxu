// pages/personalInfo/personalInfo.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: ['山西省', '临汾市', '侯马市'],
    imgs: [],//本地图片地址数组
    picPaths: [],//网络路径
    area: '',
    sexOptions:[
      { name: '男', value: '1' },
      { name: '女', value: '2' }
    ],
    userInfo:{},
    perInfo:{
        userImg: '../../assets/photo.png',
        name: '杨先生',
        sex: '2',
        compant: '方略陆港',
        tel: '12345678',
        phone: '0351-123456',
        mail: 'zhangsan@163.com'
    },
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
    })
  },
  formSubmit: function (e) {
    var postData = {
      transCode: 'MUSR09',
      funType: 'editUserInfo',
      userId: wx.getStorageSync('userInfo').userId,
      email: e.detail.value.email,
      userName: e.detail.value.userName,
      sex: e.detail.value.sex,
      tel: e.detail.value.tel,
      area: JSON.stringify(e.detail.value.area)
    }
    app.wxRequest('post', postData, this.getData, this.error)
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
      wx.showToast({
        title: '提交成功',
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
  },
  chooseImage:function(){
    var that = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        if (!res.cancel) {
          // if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          // } else if (res.tapIndex == 1) {
          //   that.chooseWxImage('camera')
          // }
        }
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
      }
    })
  },
  // 图片本地路径
  chooseWxImage: function (type) {
    var that = this;
    var imgsPaths = that.data.imgs;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        that.upImgs(res.tempFilePaths[0], 0) //调用上传方法
      }
    })
  },
  //上传服务器
  upImgs: function (imgurl, index) {
    var that = this;
    wx.uploadFile({
      url: 'https://192.168.139.142:8080/bank/dis/upload.action',//
      filePath: imgurl,
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        console.log(res)
        var data = JSON.parse(res.data)
        that.data.picPaths.push(data['msg'])
        that.setData({
          picPaths: that.data.picPaths
        })
        console.log(that.data.picPaths)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      region: JSON.parse(wx.getStorageSync('userInfo').area)
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