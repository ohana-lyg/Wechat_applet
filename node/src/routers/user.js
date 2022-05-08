const Router = require("@koa/router");
const router = Router({
  prefix: "/api/user",
});
const userController = require("../controllers/userController");

router.post("/check", userController.check);
router.get("/listAll", userController.listAll);
router.post("/create", userController.create);
router.put("/update", userController.update);
router.delete("/delete/:id", userController.delete);
module.exports = router.routes();
