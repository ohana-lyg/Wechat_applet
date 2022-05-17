// pages/order_info/order_info.js

import {
    formatTime
} from '../../utils/util';
import {
    order
} from '../../data/data';
import {
    Checkbusiness
} from "../apis/business";
import {
    Checkorder
} from "../apis/order";


Page({

    /**
     * 页面的初始数据
     */
    data: {
        order
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
        Checkbusiness(data).then(res => {
            console.log(res);
            console.log(res.list._id);

            const data_order = {
                business_id: res.list._id
            };
            Checkorder(data_order).then(res1 => {
                console.log(res1);
                res1.list.forEach(item => {
                    item.createdAt = formatTime(item.createdAt)
                })
                that.setData({
                    order: res1.list
                })
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