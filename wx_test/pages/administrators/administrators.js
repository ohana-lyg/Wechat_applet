// pages/administrators/administrators.js

import { adminList,info,admin,foods,order } from '../../data/data'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        adminList,
        admin,
        foods,
        order,
        info,
        curNav:0
    },

    selectNav: function(event) {
        var food = [];
        var that = this;
        var id = event.target.dataset.id;
        wx.setStorageSync("id",id);
        //var x = wx.getStorageSync("id");
        //console.log(x);
        //var name = event.target.dataset.any.name;
        //console.log(name);
        that.setData({
            curNav: id
        })
        //console.log(id);
        // f = foods.filter(item => item.foodsList_id == id);
        //console.log(f);
        // that.setData({
        //     food: f
        // })
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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