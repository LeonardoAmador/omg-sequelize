const express = require("express");
const PeopleControllers = require("../controllers/PeopleControllers");
const router = express.Router();

router
  .get("/people", PeopleControllers.getAllPeople)
  .get("/people/:id", PeopleControllers.getPersonById)
  .post("/people", PeopleControllers.registerPerson)
  .put("/people/:id", PeopleControllers.updatePerson)
  .delete("/people/:id", PeopleControllers.deletePerson);
  
module.exports = router;