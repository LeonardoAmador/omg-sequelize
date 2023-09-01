const { People } = require("../models/index");

class PeopleControllers {
  static getAllPeople = async (req, res, next) => {
    try {
      const peopleList = await People.findAll();
      res.status(200).json(peopleList);
    } catch (error) {
      next(error);
    }
  };

  static getPersonById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const searchedPerson = await People.findOne({
        where: { id: Number(id) },
      });

      if (searchedPerson === null) {
        throw new Error(`Person not found - ID ${id}`);
      }

      res.status(200).json(searchedPerson);
    } catch (error) {
      next(error);
    }
  };

  static registerPerson = async (req, res, next) => {
    const { email } = req.body;

    const existingEmail = await People.findOne({ where: { email: email } });

    if (existingEmail) {
      return res.status(400).send({ message: "Email already in use" });
    }

    try {
      const newCreatedPerson = await People.create(req.body);

      if (!newCreatedPerson) {
        res.send({ message: "Can not create person" });
      }

      res.status(201).json(newCreatedPerson);
    } catch (error) {
      next(error);
    }
  };

  static updatePerson = async (req, res, next) => {
    const { id } = req.params;
    const newPersonInfo = req.body;

    try {
      const existingPerson = await People.findByPk(id);

      if (!existingPerson) {
        throw new Error(`Person not found - ID ${id}`);
      }

      await People.update(newPersonInfo, { where: { id: Number(id) } });

      const updatedPerson = await People.findOne({ where: { id: Number(id) } });

      res.status(200).json(updatedPerson);
    } catch (error) {
      next(error);
    }
  };

  static deletePerson = async (req, res, next) => {
    const { id } = req.params;

    try {
      const deletedPerson = await People.destroy({ where: { id: Number(id) } });

      if (!deletedPerson) {
        res.status(409).send("Could not delete the person");
      }

      res.status(200).send({ message: `Person ID - ${id} deleted`});
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PeopleControllers;