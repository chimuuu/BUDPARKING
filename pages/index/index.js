//index.js

var app = getApp()
const AV = require('../../utils/av-weapp.js');

Page({
  data: {
    state: '扫码停车',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgUrls: [
      '../../images/1.png',
      '../../images/2.png'
    ],
    hidden: true,
  },
  loadingChange: function () {
    this.setData({
      hidden: true
    })
  },
  onLoad: function (options) {

  },
  onShow: function () {
    if (app.globalData.state_flag == 0) {
      this.setData({
        state: '扫码停车',
      })
    }
    if (app.globalData.state_flag == 1) {
      this.setData({
        state: '正在计费',
      })
    }
  },
  choose_image: function () {
    if (app.globalData.state_flag == 0) {
      wx.scanCode({
        success: (res) => {
          console.log(res)
          wx.navigateTo({
            //携带二维码解析结果参数
            url: '../Time_fee/Time_fee?qrcode=' + res.result,
          })
        }
      })
    }
    if (app.globalData.state_flag == 1) {
          wx.navigateTo({
            //携带二维码解析结果参数
            url: '../Time_fee/Time_fee',
          })
        }
    }
    // choose_image: function () {
    //   if (app.globalData.state_flag == 0) {
    //     var _this = this;
    //     var fileurl = null;
    //     wx.chooseImage({
    //       count: 1, // 默认9  
    //       sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
    //       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
    //       success: function (res) {
    //         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
    //         _this.setData({
    //           tempFilePaths: res.tempFilePaths,
    //           hidden: false
    //         })
    //         var tempFilePath = res.tempFilePaths[0];
    //         new AV.File('file-name', {
    //           blob: {
    //             uri: tempFilePath,
    //           },
    //         }).save().then(
    //           // fileurl = file.url(),
    //           function (file) {
    //             // src: file.url()
    //             wx.request({
    //               // url: 'https://api.qrserver.com/v1/read-qr-code/',
    //               url: 'https://cli.im/Api/Browser/deqr',
    //               data: {
    //                 data: file.url()
    //               },
    //               header: {
    //                 'content-type': 'application/json'
    //               },
    //               method: 'GET',
    //               success: function (res) {
    //                 _this.setData({
    //                   hidden: true
    //                 })
    //                 // console.log(res.data[0].symbol[0].data)
    //                 console.log(res.data.data.RawData)
    //                 wx.navigateTo({
    //                   //携带二维码解析结果参数
    //                   url: '../Time_fee/Time_fee?qrcode=' + res.data.data.RawData,
    //                 })
    //               }
    //             })
    //             return console.log(file.url());
    //           },
    //         ).catch(console.error);
    //       }
    //     })
    //   }
    //   if (app.globalData.state_flag == 1) {
    //     wx.navigateTo({
    //       //携带二维码解析结果参数
    //       url: '../Time_fee/Time_fee',
    //     })
    //   }
    // },
  })
