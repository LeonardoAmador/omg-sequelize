const { Classes } = require("../models/index");
const { Op } = require("sequelize");

class ClassesControllers {
  
  static async isClassExists(res, id) {
    const group = await Classes.findByPk(id);

    if (!group) {
      return res.send({ 
        success: false, 
        message: `Class with ID ${id} does not exist` 
      });
    }
  }

  static getAllClassesByDateRange  = async (req, res, next) => {
    const { initial_date, final_date  } = req.query;
    const where = {};

    if (initial_date || final_date) {
      where.start_date = {};
    }

    initial_date ? where.start_date[Op.gte] = initial_date : null;
    final_date ? where.start_date[Op.lte] = final_date : null;
    
    try {
      const allClasses = await Classes.findAll({ where });
      
      if (allClasses.length === 0) {
        return res.status(404).send({ success: false, message: "No classes found!"});
      }

      return res.status(200).json(allClasses);

    } catch (error) {
      next(error);
    }
  };

  static getClassById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const searchedClass = await Classes.findOne({ where: { id: Number(id) } });

      if (!searchedClass) {
        return res.status(404).send({ success: false, message: `No class found with ID - ${id}` });
      }

      res.status(200).json(searchedClass);
    } catch (error) {
      next(error);
    }
  };

  static registerClass = async (req, res, next) => {
    const newClass  = req.body;

    if (!newClass || Object.keys(newClass).length === 0) {
      return res.status(400).send({ message: "Invalid or missing class data" });
    }

    try {
      const newRegisteredClass = await Classes.create(newClass);

      if (!newRegisteredClass) {
        res.send("Can not create class");
      }

      res.status(202).json({ success: true, data: newRegisteredClass });

    } catch (error) {
      next(error);
    }
  };

  static updateClass = async (req, res, next) => {
    const { id } = req.params;
    const newClassInfo = req.body;

    try {
      await ClassesControllers.isClassExists(res, id);

      await Classes.update(newClassInfo, { where: { id: Number(id) } });

      const updatedClass = await Classes.findOne({ where: { id: Number(id) } });

      res.status(200).json(updatedClass);
    } catch (error) {
      next(error);
    }
  };

  static deleteClass = async (req, res, next) => {
    const { id } = req.params;

    try {
      await ClassesControllers.isClassExists(res, id);

      await Classes.destroy({ where: { id: Number(id) } });

      res.status(200).send({ success: true, message: `Class ID - ${id} deleted` });
    } catch (error) {
      next(error);
    }
  };

  static restoreClass = async (req, res, next) => {
    const { id } = req.params;

    try {
      const classRestored = await Classes.restore({
        where: { id: Number(id ) },
      });

      if (!classRestored) {
        return res.status(404).send({
          success: false,
          message: `Can not restore class - ID ${id}`,
        });
      }

      return res
        .status(200)
        .send({ success: true, message: `id - ${id} restored` });
    } catch (error) {
      console.error("Error in restoreClass:", error);
      next(error);
    }
  };
}

module.exports = ClassesControllers;