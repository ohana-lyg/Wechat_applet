// pages/comment/comment.js
import {
    formatTime
} from "../../utils/util"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        comment:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var user_oppenid = wx.getStorageSync('user_id')
        wx.request({
            url: 'http://127.0.0.1:3000/api/comment/check',
            method: "POST",
            data: {
                user_oppenid: user_oppenid
            },
            success: function (res) {
                console.log(res);
                f = res.data.list;
                f.forEach(item => {
                    item.createdAt = formatTime(item.createdAt);
                })
                console.log(f[0].business_name);
                that.setData({
                    comment: f
                })
            }
        })
        
        // wx.request({
        //   url: 'url',
        // })
        wx.setNavigationBarTitle({
            title: options.name,
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