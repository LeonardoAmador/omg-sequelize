const express = require("express");
const ClassesControllers = require("../controllers/ClassesControllers");
const router = express.Router();

router
  .get("/classes", ClassesControllers.getAllClasses)
  .get("/classes/:id", ClassesControllers.getClassById)
  .post("/classes", ClassesControllers.registerClass)
  .put("/classes/:id", ClassesControllers.updateClass)
  .delete("/classes/:id", ClassesControllers.deleteClass);

module.exports = router;