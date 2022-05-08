const dining_roomService = require("../services/dining_roomService");

class dining_roomController {
  /* async check(ctx) {
    const list = await dining_roomService.check(ctx.params.dname);
    ctx.body = { list };
  } */
  async listAll(ctx) {
    const list = await dining_roomService.listAll();
    ctx.body = { list };
  }
  /* async create(ctx) {
    const { name } = ctx.request.body;
    const result = await dining_roomService.create({ name });
    ctx.body = { result };
  }
  async delete(ctx) {
    await dining_roomService.delete(ctx.params.id);
    ctx.body = { ok: true };
  }
  async update(ctx) {
    await dining_roomService.update(ctx.params.id, { name: "shfk" });
    ctx.body = { ok: true };
  } */
}
module.exports = new dining_roomController();
