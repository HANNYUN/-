/*
 * @Author: your name
 * @Date: 2021-03-17 21:57:35
 * @LastEditTime: 2021-03-22 19:55:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wxapp- - 副本\app.js
 */
//app.js
var app = getApp()
var plugin = requirePlugin("myPlugin"); 
App({
    onLaunch: function () {
      // 初始化云环境
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
        wx.cloud.init({
            traceUser: true,
        })
    }
    // 展示本地存储能力 调用API从本地缓存中获取数据
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
    var me = this;
    wx.getSystemInfo({
      /* 把res这个参数理解为一个Object。 res.data指服务器返回的内容。 */
      success: (res) => {
        let isIOS = res.system.indexOf('iOS') > -1
        let navHeight = 0
        if (!isIOS) {
          navHeight = 48
        } else {
          navHeight = 44
        }
        this.data.backgroundHeight = res.windowHeight
        this.data.statusBarHeight = res.statusBarHeight + navHeight
      }
    })
    let address = (this.data.backgroundHeight - 120) + "px" 
    let url = "url('https://wx2.sinaimg.cn/mw690/006d9R6fgy3gn6o9cm512j316o1kwu0z.jpg')" + " " +"no-repeat" +  " " + "scroll" + " "  + "0px" + " " + "0px" + "/" + "100%"+ " "+ address
    plugin.init({
      appid: "ORRPSIGlrZUH9qYZNwMthWcbNdqGyr",
      // textToSpeech: true,
      guideList: [
        "胡晓慧",
        "相声",
        "平顶山天气",
        "故乡",
      ],
      // welcome: '请问需要什么帮助',
      background: url,
      guideCardHeight: 50,
      operateCardHeight: 130,
      // history: true,
      // historySize: 60,
      navHeight: this.data.statusBarHeight,
      success: () => {
      },
      fail: error => {}
    });
    
    me.globalData = {};
  },
  data() {
    return {
      /* statusBarHeight 获取状态栏高度
      开发工具 statusbarHeight    是小写的才能取值。。
      真机必须 statusBarHeight   是大写的才能取值。 */
      backgroundHeight: '',
      statusBarHeight: ''
    }
  },
  globalData: {
    userInfo: null,
    list:[],
    appId: null,
    userInfo: null,
    apiUrl: null,
    color: '0aecc3',
    imageUrl: 'http://image.kucaroom.com/',
    bgImage: 'http://image.kucaroom.com/',
    changeSchoolPost: false,
    changeSchoolSale: false,
    changeSchoolMatch: false,
    postHelp: false,
    reloadSale: false,
    reloadHome: false,
    param: false,
    // 是否从posttopic跳转
    isposttopic:false},
    // 获取当前时间
    getnowtime: function() {
      var date = new Date
      var year = date.getFullYear().toString()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()

      if (hour.toString().length === 1) {
          hour = '0' + hour.toString()
      } else if (minute.toString().length === 1) {
          minute = '0' + minute.toString()
      } else if (second.toString().length === 1) {
          second = '0' + second.toString()
      }

      var nowtime = year + '/' + month.toString() + '/' + day.toString() + ' ' + hour + ":" + minute + ":" + second
      return nowtime
  },

  // 创建新的消息盒子
  message: function (data) {
      // 评论、点赞人昵称
      var nickname = data.nickname
      // 评论、点赞人头像
      var avatar = data.avatar
      // 更新时间
      var updatetime = app.getnowtime()
      // 评论、点赞内容
      var content = data.content
      // 接收的用户openid
      var messageuser = data.messageuser
      // 当前帖子id
      var objId = data.objId
      // 更新消息
      const db = wx.cloud.database()
      db.collection('message').add({
          data: {
              "from_user": {
                  "avatar": avatar,
                  "nickname": nickname
              },
              "created_at": updatetime,
              "content": '@' + nickname + ' 评论你：' + content,
              "isread": false,
              "messageuser": messageuser,
              "objId": objId

          },
          success(res) {
              // console.log('messageres',res)
          },
          fail: console.log
      })
  },
 
  /**
   * 获取新的消息盒子
   */
  getNewInbox: function(type, callback) {

  },
  /**
   * 获取新的消息盒子
   */
  getParam: function(callback) {}

})