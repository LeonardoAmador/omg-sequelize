const express = require("express");
const PeopleControllers = require("../controllers/PeopleControllers");
const router = express.Router();

router
  .get("/people", PeopleControllers.getAllPeople)
  .get("/people/:id", PeopleControllers.getPersonById)
  .post("/people", PeopleControllers.registerPerson)
  .post("/people/:id/restore", PeopleControllers.restorePerson)
  .put("/people/:id", PeopleControllers.updatePerson)
  .delete("/people/:id", PeopleControllers.deletePerson)
  .get("/people/:studentId/enrollment/:enrollmentId", PeopleControllers.getEnrollment)
  .post("/people/:studentId/enrollment", PeopleControllers.registerEnrollment)
  .post("/people/:studentId/enrollment/:enrollmentId/restore", PeopleControllers.restoreEnrollment)
  .put("/people/:studentId/enrollment/:enrollmentId", PeopleControllers.updateEnrollment)
  .delete("/people/:studentId/enrollment/:enrollmentId", PeopleControllers.deleteEnrollment);
  
module.exports = router;