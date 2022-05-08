// 使用 inspirecloud 调用轻服务功能
const inspirecloud = require("@byteinspire/inspirecloud-api");

//评论表
const commentTable = inspirecloud.db.table("comment");

module.exports = commentTable;
