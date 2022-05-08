// 使用 inspirecloud 调用轻服务功能
const inspirecloud = require("@byteinspire/inspirecloud-api");

//s收藏表
const collectionTable = inspirecloud.db.table("collection");

module.exports = collectionTable;
