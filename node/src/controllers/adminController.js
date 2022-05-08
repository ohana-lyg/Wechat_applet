const adminService = require("../services/adminService");

class adminController {
  async check(ctx) {
    const admin = ctx.request.body;
    const list = await adminService.check(admin);
    ctx.body = { list };
  }
  async listAll(ctx) {
    const list = await adminService.listAll();
    ctx.body = { list };
  }
  async create(ctx) {
    const { adminname, admin_oppenid } = ctx.request.body;
    const result = await adminService.create({ adminname, admin_oppenid });
    ctx.body = { result };
  }
  async delete(ctx) {
    const admin = ctx.request.body;
    await adminService.delete(admin);
    ctx.body = { ok: true };
  }
  async update(ctx) {
    const admin = ctx.request.body;
    const result = await adminService.update(admin);
    ctx.body = { result };
  }
}
module.exports = new adminController();
