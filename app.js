//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    // URL: 'http://192.168.139.142:8080',
    URL: 'http://192.168.139.201:8080',
    userInfo: null,
    paramData:{
      corpCode: 1111,
      channelCode: 2222
    }
  },
  wxRequest(method, data, callback, errFun) {
    wx.request({
      url: this.globalData.URL + '/bank/dis/prepose.action',
      method: method,
      data:  JSON.parse((JSON.stringify(data) + JSON.stringify(this.globalData.paramData)).replace(/}{/, ',')), 
      header: {
        'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        callback(res);
      },
      fail: function (err) {
        errFun(err);
      }
    })
  }
})