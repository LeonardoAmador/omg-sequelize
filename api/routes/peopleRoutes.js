const express = require("express");
const PeopleControllers = require("../controllers/PeopleControllers");
const router = express.Router();

router
  .get("/people", PeopleControllers.getActivePeople)
  .get("/people/all", PeopleControllers.getAllPeople)
  .get("/people/:id", PeopleControllers.getPersonById)
  .get("/people/:studentId/enrollment", PeopleControllers.getPersonEnrollment)
  .post("/people", PeopleControllers.registerPerson)
  .post("/people/:id/restore", PeopleControllers.restorePerson)
  .put("/people/:id", PeopleControllers.updatePerson)
  .delete("/people/:id", PeopleControllers.deletePerson)
  .get("/people/:studentId/enrollment/:enrollmentId", PeopleControllers.getEnrollment)
  .get("/people/enrollment/:classId/confirmed", PeopleControllers.getEnrollmentsByClass)
  .get("/people/enrollment/crowded", PeopleControllers.getCrowdedClasses)
  .post("/people/:studentId/enrollment", PeopleControllers.registerEnrollment)
  .post("/people/:studentId/enrollment/:enrollmentId/restore", PeopleControllers.restoreEnrollment)
  .post("/people/:studentId/cancel", PeopleControllers.cancelPerson)
  .put("/people/:studentId/enrollment/:enrollmentId", PeopleControllers.updateEnrollment)
  .delete("/people/:studentId/enrollment/:enrollmentId", PeopleControllers.deleteEnrollment);
  
module.exports = router;