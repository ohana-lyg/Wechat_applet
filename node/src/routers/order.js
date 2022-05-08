const Router = require("@koa/router");
const router = Router({
  prefix: "/api/order",
});
const orderController = require("../controllers/orderController");

router.post("/check", orderController.check);
router.get("/listAll", orderController.listAll);
router.post("/create", orderController.create);
router.put("/update", orderController.update);
router.delete("/delete/:id", orderController.delete);
module.exports = router.routes();
