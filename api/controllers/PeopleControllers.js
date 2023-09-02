const { People, Enrollment } = require("../models/index");

class PeopleControllers {
  static getAllPeople = async (req, res, next) => {
    try {
      const peopleList = await People.findAll();
      res.status(200).json(peopleList);
    } catch (error) {
      next(error);
    }
  };git 

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

  static getEnrollment = async (req, res, next) => {
    try {
      const { studentId, enrollmentId } = req.params;

      const searchedEnrollment = await Enrollment.findOne({
        where: { 
          id: Number(enrollmentId),
          student_id: Number(studentId)
        },
      });

      if (searchedEnrollment === null) {
        throw new Error(`Enrollment not found - ID ${enrollmentId}`);
      }

      res.status(200).json(searchedEnrollment);
    } catch (error) {
      next(error);
    }
  };

  static registerEnrollment = async (req, res, next) => {
    const { studentId } = req.params;
    const enrollment  = { ...req.body, student_id: Number(studentId) };

    try {
      const newEnrollment = await Enrollment.create(enrollment);

      if (!newEnrollment) {
        res.send({ message: "Can not create enrollment" });
      }

      res.status(201).json(newEnrollment);
    } catch (error) {
      next(error);
    }
  };

  static updateEnrollment = async (req, res, next) => {
    const { studentId, enrollmentId } = req.params;
    const newInfo = req.body;

    try {
      const existingEnrollment = await People.findByPk(enrollmentId);

      if (!existingEnrollment) {
        throw new Error(`Enrollment not found - ID ${enrollmentId}`);
      }

      await Enrollment.update(newInfo, { 
        where: { 
          id: Number(enrollmentId),
          student_id: Number(studentId)
        } 
      });

      const updatedEnrollment = await Enrollment.findOne({ 
        where: { id: Number(enrollmentId) } 
      });

      res.status(200).json(updatedEnrollment);
    } catch (error) {
      next(error);
    }
  };

  static deleteEnrollment = async (req, res, next) => {
    const { enrollmentId } = req.params;

    try {
      const deletedEnrollment = await Enrollment.destroy({ 
        where: { 
          id: Number(enrollmentId) 
        } 
      });

      if (!deletedEnrollment) {
        res.status(409).send("Could not delete the person");
      }

      res.status(200).send({ message: `Enrollment ID - ${enrollmentId} deleted`});
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PeopleControllers;