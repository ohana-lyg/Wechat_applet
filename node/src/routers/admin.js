const Router = require("@koa/router");
const router = Router({
  prefix: "/api/admin",
});
const adminController = require("../controllers/adminController");

router.post("/check", adminController.check);
router.get("/listAll", adminController.listAll);
router.post("/create", adminController.create);
router.put("/update", adminController.update);
router.post("/delete", adminController.delete);
module.exports = router.routes();
