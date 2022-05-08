const commentTable = require("../models/commentTable");
const inspirecloud = require("@byteinspire/inspirecloud-api");
const ObjectId = inspirecloud.db.ObjectId;
const db = inspirecloud.db;

class commentService {
  async listAll() {
    const all = await commentTable.where().find();
    return all;
  }
  async create(comment) {
    return await commentTable.save(comment);
  }
  async delete(id) {
    const result = await commentTable.where({ _id: ObjectId(id) }).delete();
    if (result.deletedCount === 0) {
      const error = new Error(`comment:${id} not found`);
      error.status = 404;
      throw error;
    }
  }
  /*   async update(id, updater) {
    const comment = await commentTable.where({ _id: ObjectId(id) }).findOne();
    if (!comment) {
      const error = new Error(`comment:${id} not found`);
      error.status = 404;
      throw error;
    }
    comment.commentname = updater.commentname;
    return await commentTable.save(comment);
  } */
  async check(commentInfo) {
    //console.log(id);
    console.log(commentInfo);
    if (commentInfo.food_id) {
      const comment = await commentTable
        .where({ food_id: String(commentInfo.food_id) })
        .find();
      if (!comment) {
        const error = new Error(`comment:${id} not found`);
        error.status = 404;
        throw error;
      }
      //console.log(comment);
      return comment;
    } else {
      const comment = await commentTable
        .where({ user_oppenid: commentInfo.user_oppenid })
        .find();
      if (!comment) {
        const error = new Error(`comment:${id} not found`);
        error.status = 404;
        throw error;
      }
      return comment;
    }
  }
}
module.exports = new commentService();
