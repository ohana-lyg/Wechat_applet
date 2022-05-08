const dining_roomTable = require("../models/dining_roomTable");
const inspirecloud = require("@byteinspire/inspirecloud-api");
const ObjectId = inspirecloud.db.ObjectId;

class dining_roomService {
  async listAll() {
    const all = await dining_roomTable.where().find();
    return all;
  }
  /*   async create(dining_room) {
    return await dining_roomTable.save(dining_room);
  } */
  /*   async delete(id) {
    const result = await dining_roomTable.where({ _id: ObjectId(id) }).delete();
    if (result.deletedCount === 0) {
      const error = new Error(`dining_room:${id} not found`);
      error.status = 404;
      throw error;
    }
  } */
  /*   async update(id, updater) {
    const dining_room = await dining_roomTable
      .where({ _id: ObjectId(id) })
      .findOne();
    if (!dining_room) {
      const error = new Error(`dining_room:${id} not found`);
      error.status = 404;
      throw error;
    }
    dining_room.name = updater.name;
    await dining_roomTable.save(dining_room);
  } */
  /*   async check(id) {
    const dining_room = await dining_roomTable.where({ name: dname }).findOne();
    if (!dining_room) {
      const error = new Error(`dining_room:${dname} not found`);
      error.status = 404;
      throw error;
    }
    return dining_room;
  } */
}
module.exports = new dining_roomService();
