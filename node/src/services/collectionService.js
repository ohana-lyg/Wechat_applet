const collectionTable = require("../models/collectionTable");
const inspirecloud = require("@byteinspire/inspirecloud-api");
const ObjectId = inspirecloud.db.ObjectId;
const db = inspirecloud.db;

class collectionService {
  async listAll() {
    const all = await collectionTable.where().find();
    return all;
  }
  async create(collection) {
    console.log(collection);
    return await collectionTable.save(collection);
  }
  async delete(collectionInfo) {
    const result = await collectionTable
      .where(
        db.and(
          { user_oppenid: collectionInfo.user_oppenid },
          { food_id: collectionInfo.food_id }
        )
      )
      .delete();
    if (result.deletedCount === 0) {
      const error = new Error(`collection:${id} not found`);
      error.status = 404;
      throw error;
    }
  }
  async update(collectionInfo) {
    console.log(collectionInfo);
    const collection = await collectionTable
      .where({ _id: ObjectId(collectionInfo._id) })
      .findOne();
    if (!collection) {
      const error = new Error(`collection:${id} not found`);
      error.status = 404;
      throw error;
    }
    console.log(collection);
    collection.cancel = collectionInfo.cancel;
    return await collectionTable.save(collection);
  }
  async check(collectionInfo) {
    if (collectionInfo.food_id) {
      const collection = await collectionTable
        .where(
          db.and(
            { user_oppenid: collectionInfo.user_oppenid },
            { food_id: collectionInfo.food_id }
          )
        )
        .find();
      if (!collection) {
        const error = new Error(`collection:${id} not found`);
        error.status = 404;
        throw error;
      }
      return collection;
    } else {
      const collection = await collectionTable
        .where({ user_oppenid: collectionInfo.user_oppenid })
        .find();
      if (!collection) {
        const error = new Error(`collection:${id} not found`);
        error.status = 404;
        throw error;
      }
      return collection;
    }
  }
}
module.exports = new collectionService();
