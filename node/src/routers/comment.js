const Router = require("@koa/router");
const router = Router({
  prefix: "/api/comment",
});
const commentController = require("../controllers/commentController");

router.post("/check", commentController.check);
router.get("/listAll", commentController.listAll);
router.post("/create", commentController.create);
/* router.put("/update/:id", commentController.update); */
router.delete("/delete/:id", commentController.delete);
module.exports = router.routes();
