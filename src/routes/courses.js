const express = require('express');
const router = express.Router();
const jwtMiddleware = require("../app/middlewares/jwtMiddleware");
const courseController = require('../app/controllers/CourseController');

router.get("/create", jwtMiddleware.verifyToken, courseController.create);
router.post("/store", jwtMiddleware.verifyToken, courseController.store);
router.get("/:id/edit", jwtMiddleware.verifyToken, courseController.edit);
router.post("/handle-form-actions", jwtMiddleware.verifyToken, courseController.handleFormActions);
router.put("/:id", jwtMiddleware.verifyToken, courseController.update);
router.patch("/:id/restore", jwtMiddleware.verifyToken, courseController.restore);
router.delete("/:id", jwtMiddleware.verifyToken, courseController.destroy);
router.delete("/:id/force", jwtMiddleware.verifyToken, courseController.forceDestroy);
router.get("/:slug", jwtMiddleware.verifyToken, courseController.show);

module.exports = router;
