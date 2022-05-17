// pages/dish_info/dish_info.js

import Toast from "../../miniprogram/miniprogram_npm/@vant/weapp/toast/toast";
import FieId from "../../miniprogram/miniprogram_npm/@vant/weapp/field/index";
import Button from "../../miniprogram/miniprogram_npm/@vant/weapp/button/index";
import Uploader from "../../miniprogram/miniprogram_npm/@vant/weapp/uploader/index";
import Overlay from "../../miniprogram/miniprogram_npm/@vant/weapp/overlay/index";

import {
    Createfood,
    Updatefood,
    Deletefood,
    Checkfood
} from "../apis/food";
import {
    Checkbusiness
} from "../apis/business";

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
        const {
            file
        } = event.detail;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        wx.uploadFile({
            url: 'https://qingfuwu.cn/dashboard/qcd2ep/contents', // 仅为示例，非真实的接口地址
            filePath: file.url,
            name: 'file',
            formData: {
                user: 'test'
            },
            success(res) {
                // 上传完成需要更新 fileList
                const {
                    fileList = []
                } = this.data.fileList;
                fileList.push({
                    ...file,
                    url: res.data
                });
                this.setData({
                    fileList
                });
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
        const data = {
            id: options.target.dataset.any._id
        };
        Deletefood(data).then(res => {
            that.showfood();
        })
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
                const data = {
                    id: that.data.id,
                    name: that.data.food_name,
                    price: that.data.food_price,
                    picture: that.data.fileList.url
                };
                Updatefood(data).then(res => {
                    that.showfood();
                })
                that.setData({
                    update: false,
                    fileList: []
                })
            }
        } else {
            var user_oppenid = wx.getStorageSync('user_id');
            const data = {
                user_oppenid: user_oppenid
            };
            Checkbusiness(data).then(res => {
                console.log(res);
                console.log(res.list._id);
                const data_food = {
                    name: that.data.food_name,
                    price: that.data.food_price,
                    picture: that.data.fileList.url,
                    business_id: res.list._id
                };
                Createfood(data_food).then(res => {
                    that.showfood();
                })
                that.setData({
                    newadd: false,
                    fileList: []
                })
            })
        }
    },

    showfood: function () {
        var that = this;
        var user_oppenid = wx.getStorageSync('user_id');
        const data = {
            user_oppenid: user_oppenid
        };
        Checkbusiness(data).then(res => {
            console.log(res);
            console.log(res.list._id);
            const data_food = {
                business_id: res.list._id
            };
            Checkfood(data_food).then(res1 => {
                console.log(res1);
                that.setData({
                    foods: res1.list
                })
                console.log(res1.list);
            })
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