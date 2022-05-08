const userTable = require("../models/userTable");
const inspirecloud = require("@byteinspire/inspirecloud-api");
const ObjectId = inspirecloud.db.ObjectId;
const StringId = inspirecloud.db.String;

class userService {
  async listAll() {
    const all = await userTable.where().find();
    return all;
  }
  async create(user) {
    return await userTable.save(user);
  }
  async delete(userInfo) {
    console.log(userInfo);
    const result = await userTable.where({ user_oppenid: userInfo }).delete();
    if (result.deletedCount === 0) {
      const error = new Error(`user:${id} not found`);
      error.status = 404;
      throw error;
    }
  }
  async update(userInfo) {
    const user = await userTable
      .where({ user_oppenid: userInfo.user_oppenid })
      .findOne();
    if (!user) {
      const error = new Error(`user:${id} not found`);
      error.status = 404;
      throw error;
    }
    user.address = userInfo.address;
    user.phonenum = userInfo.phonenum;
    user.mailbox = userInfo.mailbox;
    return await userTable.save(user);
  }
  async check(useInfo) {
    //console.log("id", useInfo);
    const user = await userTable
      .where({ user_oppenid: useInfo.user_oppenid })
      .findOne();
    //console.log(user);
    if (!user) {
      const result = await userTable.save(useInfo);
      return result;
      /* const error = new Error(`user:${id} not found`);
      error.status = 404;
      throw error; */
    }
    return user;
  }
}
module.exports = new userService();
