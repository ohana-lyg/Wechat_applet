// 使用 inspirecloud 调用轻服务功能
const inspirecloud = require("@byteinspire/inspirecloud-api");

//订单表
const orderTable = inspirecloud.db.table("order");

module.exports = orderTable;
