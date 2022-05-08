const commentService = require("../services/commentService");

class commentController {
  async check(ctx) {
    //console.log(ctx.params.id);
    const comment = ctx.request.body;
    //console.log(comment);
    const list = await commentService.check(comment);
    ctx.body = { list };
  }
  async listAll(ctx) {
    const list = await commentService.listAll();
    ctx.body = { list };
  }
  async create(ctx) {
    const comment = ctx.request.body;
    const result = await commentService.create(comment);
    ctx.body = { result };
  }
  async delete(ctx) {
    await commentService.delete(ctx.params.id);
    ctx.body = { ok: true };
  }
  /*   async update(ctx) {
    const { commentname } = ctx.request.body;
    const result = await commentService.update(ctx.params.id, { commentname });
    ctx.body = { result };
  } */
}
module.exports = new commentController();
