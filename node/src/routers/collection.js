const Router = require("@koa/router");
const router = Router({
  prefix: "/api/collection",
});
const collectionController = require("../controllers/collectionController");

router.post("/check", collectionController.check);
router.post("/listAll", collectionController.listAll);
router.post("/create", collectionController.create);
router.put("/update", collectionController.update);
router.post("/delete", collectionController.delete);
module.exports = router.routes();
