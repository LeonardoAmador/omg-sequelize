const { Classes } = require("../models/index");

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

  static getAllClasses = async (req, res, next) => {
    try {
      const allClasses = await Classes.findAll();
      
      if (!allClasses.length) {
        return res.status(404).send({ success: false, message: "No classes found!"});
      }

      res.status(200).json(allClasses);

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
}

module.exports = ClassesControllers;