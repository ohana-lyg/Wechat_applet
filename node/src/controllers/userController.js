const userService = require("../services/userService");

class userController {
  async check(ctx) {
    const user = ctx.request.body;
    const list = await userService.check(user);
    ctx.body = { list };
  }
  async listAll(ctx) {
    const list = await userService.listAll();
    ctx.body = { list };
  }
  async create(ctx) {
    const { username, user_oppenid } = ctx.request.body;
    const result = await userService.create({ username, user_oppenid });
    ctx.body = { result };
  }
  async delete(ctx) {
    //const user = ctx.request.body;
    console.log(ctx.params.id);
    await userService.delete(ctx.params.id);
    ctx.body = { ok: true };
  }
  async update(ctx) {
    const user = ctx.request.body;
    const result = await userService.update(user);
    ctx.body = { result };
  }
}
module.exports = new userController();
