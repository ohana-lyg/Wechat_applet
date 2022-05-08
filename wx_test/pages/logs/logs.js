// pages/logs/logs.js

// import Toast from "../../miniprogram/miniprogram_npm/@vant/weapp/toast/toast";

Page({
    data: {
        str_user_login: "",
        str_user_id: "",
        str_user_name: ""
    },
    getUserProfile: function () {
        var myid = "";
        var myname = "";
        var mytouxiang = "";
        wx.getUserProfile({
            desc: "获取用户个人信息",
            success: function (res) {
                myname = res.userInfo.nickName;
                mytouxiang = res.userInfo.avatarUrl;
                console.log(myname)
                wx.login({
                    success(res) {
                        wx.request({
                            url: 'https://api.weixin.qq.com/sns/jscode2session',
                            data: {
                                appid: 'wx3f2f045d259a23fe',
                                secret: '75ebf32d8c697f852746a60ebe93c9b8',
                                js_code: res.code,
                                grant_type: 'authorization_code'
                            },
                            method: "GET",
                            success: function (res) {
                                myid = res.data.openid
                                wx.request({
                                    url: 'http://127.0.0.1:3000/api/user/check',
                                    method: "POST",
                                    data: {
                                        username: myname,
                                        user_oppenid: myid,
                                    },
                                    success: function (res) {
                                        //返回信息写入缓存
                                        wx.setStorage({
                                            key: 'user_login',
                                            data: 'yes',
                                            success: function () {
                                                console.log("写入缓存成功")
                                            }
                                        })
                                        wx.setStorage({
                                            key: 'user_id',
                                            data: res.data.list.user_oppenid,
                                            success: function () {
                                                wx.reLaunch({
                                                    url: '/pages/logs/logs',
                                                })
                                            }
                                        })
                                        wx.setStorage({
                                            key: 'user_name',
                                            data: res.data.list.username,
                                            //data: "",
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
       
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // Toast('我是提示文案，建议不超过十五字~');
        wx.getStorage({
            key: 'user_id',
            success: function (res) {
                that.setData({
                    str_user_id: res.data
                })
            },
        })

        wx.getStorage({
            key: 'user_name',
            success: function (res) {
                that.setData({
                    str_user_name: res.data
                })
            },
        })

        wx.getStorage({
            key: 'user_login',
            success: function (res) {
                that.setData({
                    str_user_login: res.data
                })
                if (res.data == "yes") {
                    wx.switchTab({
                        url: '/pages/index/index',
                    })
                }
            },
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this
        wx.getStorage({
            key: 'user_login',
            success: function (res) {
                that.setData({
                    str_user_login: res.data
                })
                if (res.data == "yes") {
                    wx.switchTab({
                        url: '/pages/index/index',
                    })
                }
            },
        })
    },
})