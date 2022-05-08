// 使用 inspirecloud 调用轻服务功能
const inspirecloud = require("@byteinspire/inspirecloud-api");

//食堂表
const dining_roomTable = inspirecloud.db.table("dining_room");

module.exports = dining_roomTable;
