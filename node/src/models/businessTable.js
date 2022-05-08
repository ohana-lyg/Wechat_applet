// 使用 inspirecloud 调用轻服务功能
const inspirecloud = require("@byteinspire/inspirecloud-api");

//商家表
const businessTable = inspirecloud.db.table("business");

module.exports = businessTable;
