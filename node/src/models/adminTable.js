// 使用 inspirecloud 调用轻服务功能
const inspirecloud = require("@byteinspire/inspirecloud-api");

//用户表
const adminTable = inspirecloud.db.table("admin");

module.exports = adminTable;
