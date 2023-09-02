const express = require("express");
const PeopleControllers = require("../controllers/PeopleControllers");
const router = express.Router();

router
  .get("/people", PeopleControllers.getAllPeople)
  .get("/people/:id", PeopleControllers.getPersonById)
  .post("/people", PeopleControllers.registerPerson)
  .put("/people/:id", PeopleControllers.updatePerson)
  .delete("/people/:id", PeopleControllers.deletePerson)
  .get("/people/:studentId/enrollment/:enrollmentId", PeopleControllers.getEnrollment)
  .post("/people/:studentId/enrollment", PeopleControllers.registerEnrollment)
  .put("/people/:studentId/enrollment/:enrollmentId", PeopleControllers.updateEnrollment)
  .delete("/people/:studentId/enrollment/:enrollmentId", PeopleControllers.deleteEnrollment);
  
module.exports = router;