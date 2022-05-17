// pages/dining_room/dining_room.js

import Image from "../../miniprogram/miniprogram_npm/@vant/weapp/image/index";
import {
    food,
    b_foods,
    b_foodsList
} from '../../data/data';
import {
    Getdining_room
} from "../apis/dining_room";
import {Checkfood} from "../apis/food";
import {Getbusiness} from "../apis/business";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        businessList: [],
        food: [],
        curNav: 0
    },

    selectNav: function (event) {
        var that = this;
        //console.log(event.target.dataset.any);
        wx.setStorageSync('business_name', event.target.dataset.any.name);
        var id = event.target.dataset.any._id;
        console.log(id);
        wx.setStorageSync("id", id);
        // var x = wx.getStorageSync("id");
        // console.log(x);
        const data = {
            business_id: id
        };
        Checkfood(data).then(res => {
            console.log(res);
            that.setData({
                food: res.list
            })
        })
        that.setData({
            curNav: id
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        Getdining_room().then(res => {
            console.log(res);
            const dining_room = res.list.filter(item => item.name == options.name);
            Getbusiness().then(res1 => {
                const business = res1.list.filter(item => item.dining_room_id == dining_room[0]._id);
                    const showbusiness = business.filter(item => (item.rest == true))
                    console.log(business);
                    console.log(showbusiness);
                    that.setData({
                        businessList: showbusiness
                    })
            })
        })
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