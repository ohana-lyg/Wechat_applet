// pages/dining_room/dining_room.js

import Image from "../../miniprogram/miniprogram_npm/@vant/weapp/image/index";
import { food,b_foods,b_foodsList } from '../../data/data'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        businessList:[],
        food:[],
        curNav:0
    },

    selectNav: function(event) {
        var that = this;
        //console.log(event.target.dataset.any);
        wx.setStorageSync('business_name', event.target.dataset.any.name);
        var id = event.target.dataset.any._id;
        console.log(id);
        wx.setStorageSync("id",id);
        // var x = wx.getStorageSync("id");
        // console.log(x);
        wx.request({
            url: 'http://127.0.0.1:3000/api/food/check',
            method: 'POST',
            data: {
                business_id:id
            },
            success:function(res) {
                console.log(res);
                // const food = res.data.list.filter(item => item.business_id == id);
                // console.log(food);
                that.setData({
                    food: res.data.list
                })
            }
        })
        that.setData({
            curNav: id
        })
        //wx.setStorageSync("id",id);
        //var x = wx.getStorageSync("id");
        //console.log(x);
        //var name = event.target.dataset.any.name;
        //console.log(name);
        
        //console.log(id);
        
        //console.log(f);
        // that.setData({
        //     food: f
        // })
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: 'http://127.0.0.1:3000/api/dining_room/listAll',
            success:function(res) {
                const dining_room = res.data.list.filter(item => item.name == options.name);
                //console.log(dining_room[0]._id);
                //console.log(res.data.list)
                wx.request({
                    url: 'http://127.0.0.1:3000/api/business/listAll',
                    success:function(res) {
                        const business = res.data.list.filter(item => item.dining_room_id == dining_room[0]._id);
                        const showbusiness = business.filter(item => (item.rest == true))
                        console.log(business);
                        console.log(showbusiness);
                        that.setData({
                            businessList: showbusiness
                        })
                        //console.log(business);
                        //console.log(res.data.list)
                    }
                })
                
            }
          })
        //console.log(options);
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