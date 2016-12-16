
const AV = require('../../utils/av-weapp');
var app = getApp();

var start_time = 0;
var total_cost = 0;
var local = '';


Page({
  data: {
    array: [{

    }]
  },
  onLoad: function () {
    this.data.array = [];
  },
  onShow: function () {

    var that = this;
    var userid = app.globalData.userid;

    var query = new AV.Query('Guest' + userid);
    query.find().then(function (guests) {
      for (var i = 0; i < guests.length; i++) {
        var guest = guests[i];

        that.data.array = [{
          start_time: guest.attributes.start_time, total_cost: guest.attributes.total_cost,
          local: guest.attributes.local, Timer: guest.attributes.Timer,
          latitude: guest.attributes.latitude, longitude: guest.attributes.longitude, localname: guest.attributes.localname
        }]
          .concat(that.data.array)
      }
      that.setData({
        array: that.data.array
      });
    }).catch(function (error) {
      alert(JSON.stringify(error));
    });
  },
  onHide: function () {
    this.data.array = [];
  },
  clickitem: function (e) {
    console.log("------->")
    var id = e.currentTarget.id
    var app = getApp()
    app.requestDetailid = id;
    console.log(this.data.array[id].latitude)
    console.log(this.data.array[id].longitude)
    wx.navigateTo({
      url: '../parkingLotMap/parkingLotMap?latitude=' + this.data.array[id].latitude + '&longitude=' + this.data.array[id].longitude + '&localname=' + this.data.array[id].localname
      + '&start_time=' + this.data.array[id].start_time + '&total_cost=' + this.data.array[id].total_cost
      + '&local=' + this.data.array[id].local + '&Timer=' + this.data.array[id].Timer,
    })
  }
})