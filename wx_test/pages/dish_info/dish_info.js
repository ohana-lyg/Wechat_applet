// pages/dish_info/dish_info.js

import Toast from "../../miniprogram/miniprogram_npm/@vant/weapp/toast/toast";
import FieId from "../../miniprogram/miniprogram_npm/@vant/weapp/field/index";
import Button from "../../miniprogram/miniprogram_npm/@vant/weapp/button/index";
import Uploader from "../../miniprogram/miniprogram_npm/@vant/weapp/uploader/index";
import Overlay from "../../miniprogram/miniprogram_npm/@vant/weapp/overlay/index";


// import {
//     food,
//     foods,
//     foodsList
// } from '../../data/data'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        foods: [],
        food_name: '',
        food_price: '',
        id: '',
        update: '',
        newadd: '',
        mor: '',
        food: [],
        fileList: [],
    },

    afterRead: function (event) {
        var that = this;
        console.log(event.detail.file);
        that.setData({
            fileList: event.detail.file
        })
        const { file } = event.detail;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        wx.uploadFile({
          url: 'https://qingfuwu.cn/dashboard/qcd2ep/contents', // 仅为示例，非真实的接口地址
          filePath: file.url,
          name: 'file',
          formData: { user: 'test' },
          success(res) {
            // 上传完成需要更新 fileList
            const { fileList = [] } = this.data.fileList;
            fileList.push({ ...file, url: res.data });
            this.setData({ fileList });
          },
        });
    },

    create: function () {
        var that = this;
        that.setData({
            newadd: true
        })
    },

    delete: function (options) {
        var that = this;
        console.log(options.target.dataset.any._id);
        wx.request({
            url: 'http://127.0.0.1:3000/api/food/delete',
            method: "POST",
            data: {
                id: options.target.dataset.any._id
            },
            success: function () {
                that.showfood();
            }
        })
        console.log(options.target.dataset.any);
    },

    modify: function (options) {
        var that = this;
        that.setData({
            update: true,
            id: options.target.dataset.any._id
        })
        console.log(options.target.dataset.any);
    },

    commit: function () {
        var that = this;
        console.log(this.data.fileList);
        if (that.data.update) {
            if (that.data.food) {
                wx.request({
                    url: 'http://127.0.0.1:3000/api/food/update',
                    method: "POST",
                    data: {
                        id: that.data.id,
                        name: that.data.food_name,
                        price: that.data.food_price,
                        picture: that.data.fileList.url
                    },
                    success: function () {
                        that.showfood();
                    }
                })
                that.setData({
                    update: false,
                    fileList: []
                })
            }
        } else {
            var user_oppenid = wx.getStorageSync('user_id');
            wx.request({
                url: 'http://127.0.0.1:3000/api/business/check',
                method: "POST",
                data: {
                    user_oppenid: user_oppenid
                },
                success: function (res) {
                    console.log(res);
                    console.log(res.data.list._id);
                    wx.request({
                        url: 'http://127.0.0.1:3000/api/food/create',
                        method: "POST",
                        data: {
                            name: that.data.food_name,
                            price: that.data.food_price,
                            picture: that.data.fileList.url,
                            business_id: res.data.list._id
                        },
                        success: function () {
                            that.showfood();
                        }
                    }) 
                    that.setData({
                        newadd: false,
                        fileList: []
                    })
                }

            })
        }
    },

    showfood: function () {
        var that = this;
        var user_oppenid = wx.getStorageSync('user_id');
        wx.request({
            url: 'http://127.0.0.1:3000/api/business/check',
            method: "POST",
            data: {
                user_oppenid: user_oppenid
            },
            success: function (res) {
                console.log(res);
                console.log(res.data.list._id);
                wx.request({
                    url: 'http://127.0.0.1:3000/api/food/check',
                    method: "POST",
                    data: {
                        business_id: res.data.list._id
                    },
                    success: function (res1) {
                        console.log(res1);
                        that.setData({
                            foods: res1.data.list
                        })
                        console.log(res1.data.list);
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
        that.showfood();
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