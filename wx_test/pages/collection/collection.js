// pages/collection/collection.js

import {
    formatTime
} from "../../utils/util";
import {
    Checkcollection
} from "../apis/collection";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        collection: []
    },

    cancelorder: function (event) {
        console.log(event.target.dataset.any);
        var food = event.target.dataset.any;
        console.log(food.food_id);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var user_oppenid = wx.getStorageSync('user_id');
        const data = {
            user_oppenid: user_oppenid
        };
        Checkcollection(data).then(res => {
            console.log(res);
            res.list.forEach(item => {
                item.createdAt = formatTime(item.createdAt);
            })
            that.setData({
                collection: res.list
            })
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