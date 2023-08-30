const express = require("express");
const people = require("./peopleRoutes");

module.exports = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ message: "ORM-SEQUELIZE" });
  }); 
  
  app.use(express.json(), people);
};