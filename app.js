//app.js
const AV = require('/utils/av-weapp');

App({

  onLaunch: function () {

    AV.init({
      appId: '换成你的leancloudID',
      appKey: 'AIWvKAxqanTFEmMC8vfrtzw5',
    });

    AV.User.loginWithWeapp().then(user => {
      this.globalData.user = user.toJSON();
      this.globalData.userid = this.globalData.user.objectId;
      console.log(this.globalData.userid)
    }).catch(console.error);

  },
  
  globalData:{
    userInfo:null,
    user:[],
    userid:0,
    state_flag:0,
    timer_flag:0,
    start_time:0,
    start_data:{},
    local:[],
    objectID:[],
  }
})