const express = require("express");
const ClassesControllers = require("../controllers/ClassesControllers");
const router = express.Router();

router
  .get("/classes", ClassesControllers.getAllClassesByDateRange)
  .get("/classes/:id", ClassesControllers.getClassById)
  .post("/classes", ClassesControllers.registerClass)
  .post("/classes/:id/restore", ClassesControllers.restoreClass)
  .put("/classes/:id", ClassesControllers.updateClass)
  .delete("/classes/:id", ClassesControllers.deleteClass);

module.exports = router;