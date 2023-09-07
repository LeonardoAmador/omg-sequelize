const { People, Enrollment, sequelize } = require("../models/index");
const Sequelize = require("sequelize");
class PeopleControllers {
  static validateId = (id, res) => {
    if (isNaN(id) || id <= 0) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid ID parameter" });
    }
  };

  static getActivePeople = async (req, res, next) => {
    try {
      const peopleList = await People.findAll();
      res.status(200).json(peopleList);
    } catch (error) {
      next(error);
    }
  };

  static getAllPeople = async (req, res, next) => {
    try {
      const peopleList = await People.scope("all").findAll();
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

      return res.status(200).json(updatedPerson);
    } catch (error) {
      next(error);
    }
  };

  static deletePerson = async (req, res, next) => {
    const { id } = req.params;

    try {
      const deletedPerson = await People.destroy({ where: { id: Number(id) } });

      if (!deletedPerson) {
        return res.status(409).send("Could not delete the person");
      }

      return res.status(200).send({ message: `Person ID - ${id} deleted` });
    } catch (error) {
      next(error);
    }
  };

  static restorePerson = async (req, res, next) => {
    const { id } = req.params;

    try {
      PeopleControllers.validateId(id, res);

      const personRestored = await People.restore({
        where: { id: Number(id) },
      });

      if (!personRestored) {
        return res.status(404).send({
          success: false,
          message: `Can not restore person - ID ${id}`,
        });
      }

      return res
        .status(200)
        .send({ success: true, message: `id - ${id} restored` });
    } catch (error) {
      console.error("Error in restorePerson:", error);
      next(error);
    }
  };

  static cancelPerson = async (req, res, next) => {
    const { studentId } = req.params;

    try {
      await sequelize.transaction(async (transaction) => {
        await People.update(
          { active: false },
          { where: { id: Number(studentId) } },
          { transaction }
        );
        await Enrollment.update(
          { status: "canceled" },
          { where: { student_id: Number(studentId) } },
          { transaction }
        );
      });

      return res
        .status(200)
        .json({
          message: `Enrollments for person with ID ${studentId} canceled`,
        });
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
          student_id: Number(studentId),
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
    const enrollment = { ...req.body, student_id: Number(studentId) };

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
          student_id: Number(studentId),
        },
      });

      const updatedEnrollment = await Enrollment.findOne({
        where: { id: Number(enrollmentId) },
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
          id: Number(enrollmentId),
        },
      });

      if (!deletedEnrollment) {
        res.status(409).send("Could not delete the person");
      }

      res
        .status(200)
        .send({ message: `Enrollment ID - ${enrollmentId} deleted` });
    } catch (error) {
      next(error);
    }
  };

  static restoreEnrollment = async (req, res, next) => {
    const { enrollmentId } = req.params;

    try {
      PeopleControllers.validateId(enrollmentId, res);

      const enrollmentRestored = await Enrollment.restore({
        where: { id: Number(enrollmentId) },
      });

      if (!enrollmentRestored) {
        return res.status(404).send({
          success: false,
          message: `Can not restore enrollment - ID ${enrollmentId}`,
        });
      }

      return res
        .status(200)
        .send({ success: true, message: `id - ${enrollmentId} restored` });
    } catch (error) {
      console.error("Error in restoreEnrollment:", error);
      next(error);
    }
  };

  static getPersonEnrollment = async (req, res, next) => {
    const { studentId } = req.params;

    try {
      const person = await People.findOne({ where: { id: Number(studentId) } });

      if (!person) {
        return res
          .status(404)
          .json({ message: `Person not found - ID ${studentId}` });
      }

      const enrollments = await person.getEnrolledClasses();

      if (enrollments.length === 0) {
        return res.status(200).json({
          message: "No enrollments confirmed for this person.",
          data: [],
        });
      }

      return res.status(200).json(enrollments);
    } catch (error) {
      next(error);
    }
  };

  static getEnrollmentsByClass = async (req, res, next) => {
    const { classId } = req.params;

    try {
      const allEnrollments = await Enrollment.findAndCountAll({
        where: {
          class_id: Number(classId),
          status: "confirmed",
        },
        limit: 20,
        order: [["student_id", "DESC"]],
      });

      if (allEnrollments.count === 0) {
        return res.status(404).json({
          success: false,
          message: "No confirmed enrollments found for this class.",
        });
      }

      return res.status(200).json(allEnrollments);
    } catch (error) {
      next(error);
    }
  };

  static getCrowdedClasses = async (req, res, next) => {
    const classCapacity = 10;

    try {
      const crowdedClasses = await Enrollment.findAndCountAll({
        where: {
          status: "confirmed",
        },
        attributes: ["class_id"],
        group: ["class_id"],
        having: Sequelize.literal(`count(class_id) >= ${classCapacity}`),
      });

      return res.status(200).json(crowdedClasses.count);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PeopleControllers;
