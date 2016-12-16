# 微信小程序-萌芽停车
（合作者chimuuu，CommunicationHeart，兰姐，小燕子）
##小程序主要功能包括：
（1）微信用户一键注册登录	
（2）微信扫码停车<br>
（3）停车计时计费<br>
（4）微信支付演示（暂无：这需要企业身份申请）<br>
（5）基于LeanCloud的后台数据管理<br>
（5）停车记录查询：停车开始时间，停车时长，费用，地理位置等信息（后台数据）<br>
#Demo：
##1.扫码停车演示（停车时间，车位，计费）-微信支付功能需要企业身份申请，所以只做了演示<br>
![](https://github.com/chimuuu/Images/blob/master/button3_1.gif)<br>
##2.用户停车记录查询（含地图查询）<br>
![](https://github.com/chimuuu/Images/blob/master/record_1.gif)<br><br>
##3.三个一级界面（主界面，历史记录查询界面，版本界面）<br>
![](https://github.com/chimuuu/Images/blob/master/about_all.gif)<br>
##4.后台数据管理（用户微信信息，用户使用记录）<br>
![](https://github.com/chimuuu/Images/blob/master/houtai.png)<br>
![](https://github.com/chimuuu/Images/blob/master/guest.png)<br>
![](https://github.com/chimuuu/Images/blob/master/user.png)<br>
#一、配置所需工具:
（1）微信小程序开发者账号<br>
（2）微信web开发者工具<br>
（3）LeanCloud帐号<br>
（4）LeanCloud工具类av-weapp.js<br>
##1.微信小程序开发者账号注册
###首先在微信公众号平台注册
![](https://github.com/chimuuu/Images/blob/master/1.png)
##2.获取AppID和AppSecret
登录登录https://mp.weixin.qq.com，在网站的「设置」-「开发者设置」中，查看微信小程序的AppID和AppSecret；
![](https://github.com/chimuuu/Images/blob/master/2.png)
##3.创建项目
添加你自己的AppID,新建项目-BudParking
![](https://github.com/chimuuu/Images/blob/master/3.png)
![](https://github.com/chimuuu/Images/blob/master/4.png)

##4.注册LeanCloud账号
传送https://leancloud.cn/
![](https://github.com/chimuuu/Images/blob/master/5.png)
##5.配置LeanCloud应用
登录https://leancloud.cn/applist.html#/apps<br>
在网站的「创建应用」中创建应用<br>
在leancloud控制台配置AppID（小程序ID）和AppSecret（小程序密钥）<br>
![](https://github.com/chimuuu/Images/blob/master/6.png)
![](https://github.com/chimuuu/Images/blob/master/7.png)

##6.设置微信小程序域名白名单
登录https://mp.weixin.qq.com，
在网站的「设置」-「开发者设置」中，点击「服务器配置」下的「修改」链接，增加域名<br>
具体域名通过https://leancloud.cn/docs/weapp-domains.html查询<br>
同时在request合法域名下添加https://cli.im（这是在线对二维码进行在线识别的网站）<br>
微信限制每月只能修改三次域名白名单<br>
![](https://github.com/chimuuu/Images/blob/master/8.png)
##7.获取LeanCloud应用AppID和AppKey
登录https://leancloud.cn/，在网站的「设置」-「应用Key」中，查看App ID，App Key
![](https://github.com/chimuuu/Images/blob/master/9.png)
##8.OK！ 终于可以配置小程序了！
1）将下载的av-weapp.js（https://unpkg.com/leancloud-storage@2.0.0-beta.6/dist/av-weapp.js）放到utils下<br>
2)使用const AV = require('../../utils/av-weapp.js')；路径根据具体情况而定<br>
3)做初始化：<br>
    AV.init({<br>
    appId: '你的LeanCloud-appId',<br>
    appKey: '你的LeanCloud-appKey',<br>
    });<br>
注：在微信小程序中使用 LeanCloud详见https://leancloud.cn/docs/weapp.html<br>
