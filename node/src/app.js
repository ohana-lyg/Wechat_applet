const path = require("path");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");

const todoRouter = require("./routers/todo");
const businessRouter = require("./routers/business");
const foodRouter = require("./routers/food");
const orderRouter = require("./routers/order");
const dining_roomRouter = require("./routers/dining_room");
const business_foodRouter = require("./routers/business_food");
const userRouter = require("./routers/user");
const commentRouter = require("./routers/comment");
const shopcarRouter = require("./routers/shopcar");
const collectionRouter = require("./routers/collection");
const adminRouter = require("./routers/admin");

const Koa = require("koa");

const app = new Koa();

// 为应用使用中间件
// 静态文件中间件
app.use(koaStatic(path.join(__dirname, "../public")));
// 请求体 parse 中间件，用于 parse json 格式请求体
app.use(koaBody());

/** 若后面的路由抛错，则封装为错误响应返回
 * 错误响应格式为
 * {
 *   error: message
 * }
 */
app.use(async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    // 抛出的错误可以附带 status 字段，代表 http 状态码
    // 若没有提供，则默认状态码为 500，代表服务器内部错误
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
  }
});

const cors = require("koa2-cors");
app.use(
  cors({
    origin: function (ctx) {
      //设置允许来自指定域名请求
      if (ctx.url === "/test") {
        return "*"; // 允许来自所有域名请求
      }
      return "http://localhost:8000"; //只允许http://localhost:8000这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
    allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
  })
);

// 为应用使用路由定义
// 使用待办事项业务路由
app.use(todoRouter);
app.use(businessRouter);
app.use(foodRouter);
app.use(orderRouter);
app.use(dining_roomRouter);
app.use(business_foodRouter);
app.use(userRouter);
app.use(commentRouter);
app.use(shopcarRouter);
app.use(collectionRouter);
app.use(adminRouter);

module.exports = app;
