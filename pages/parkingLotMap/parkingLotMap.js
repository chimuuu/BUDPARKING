// pages/parkingLotMap/parkingLotMap.js
Page({
    data: {
        latitude: {},
        longitude: {},
        markers: [{
            latitude: {},
            longitude: {},
            name: {}
        }],
        start_time: {},
        total_cost: {},
        local: {},
        Timer: {},
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        console.log('---->' + options.latitude)
        this.setData({
            latitude: options.latitude,
            longitude: options.longitude,
            markers: [{
                latitude: options.latitude,
                longitude: options.longitude,
                name: options.localname
            }],
            start_time: options.start_time,
            total_cost: options.total_cost,
            local: options.local,
            Timer: options.Timer,
        })
        // wx.openLocation({
        //     latitude: options.latitude,
        //     longitude: options.longitude,
        //     scale: 28
        // })
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})