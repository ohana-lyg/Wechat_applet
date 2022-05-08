const adminTable = require("../models/adminTable");
const inspirecloud = require("@byteinspire/inspirecloud-api");
const ObjectId = inspirecloud.db.ObjectId;
const StringId = inspirecloud.db.String;
const db = inspirecloud.db;

class adminService {
  async listAll() {
    const all = await adminTable.where().find();
    return all;
  }
  async create(admin) {
    return await adminTable.save(admin);
  }
  async delete(adminInfo) {
    const result = await adminTable
      .where({ admin_oppenid: adminInfo.admin_oppenid })
      .delete();
    if (result.deletedCount === 0) {
      const error = new Error(`admin:${id} not found`);
      error.status = 404;
      throw error;
    }
  }
  async update(adminInfo) {
    const admin = await adminTable
      .where({ admin_oppenid: adminInfo.admin_oppenid })
      .findOne();
    if (!admin) {
      const error = new Error(`admin:${id} not found`);
      error.status = 404;
      throw error;
    }
    admin.address = adminInfo.address;
    admin.phonenum = adminInfo.phonenum;
    admin.mailbox = adminInfo.mailbox;
    return await adminTable.save(admin);
  }
  async check(adminInfo) {
    console.log("id", adminInfo);
    const admin = await adminTable
      .where(
        db.and(
          { admin_id: adminInfo.admin_id },
          { admin_password: adminInfo.admin_password }
        )
      )
      .findOne();
    //console.log(admin);
    if (!admin) {
      const result = await adminTable.save(useInfo);
      return result;
      /* const error = new Error(`admin:${id} not found`);
      error.status = 404;
      throw error; */
    }
    return admin;
  }
}
module.exports = new adminService();
