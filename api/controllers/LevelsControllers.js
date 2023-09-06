const { Levels } = require("../models/index");

class LevelsControllers {
  
  static async isLevelExists(res, id) {
    const level = await Levels.findByPk(id);

    if (!level) {
      return res.send({ 
        success: false, 
        message: `Level with ID ${id} does not exist` 
      });
    }
  }

  static getAllLevels = async (req, res, next) => {
    try {
      const allLevels = await Levels.findAll();
      
      if (!allLevels.length) {
        return res.status(404).send({ success: false, message: "No levels found!"});
      }

      res.status(200).json(allLevels);

    } catch (error) {
      next(error);
    }
  };

  static getLevelById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const searchedLevel = await Levels.findOne({ where: { id: Number(id) } });

      if (!searchedLevel) {
        return res.status(404).send({ success: false, message: `No level found with ID - ${id}` });
      }

      res.status(200).json(searchedLevel);
    } catch (error) {
      next(error);
    }
  };

  static registerLevel = async (req, res, next) => {
    const newLevel  = req.body;

    if (!newLevel || Object.keys(newLevel).length === 0) {
      return res.status(400).send({ message: "Invalid or missing level data" });
    }

    try {
      const newRegisteredLevel = await Levels.create(newLevel);

      if (!newRegisteredLevel) {
        res.send("Can not create level");
      }

      res.status(202).json({ success: true, data: newRegisteredLevel });

    } catch (error) {
      next(error);
    }
  };

  static updateLevel = async (req, res, next) => {
    const { id } = req.params;
    const newLevelInfo = req.body;

    try {
      await LevelsControllers.isLevelExists(res, id);

      await Levels.update(newLevelInfo, { where: { id: Number(id) } });

      const updatedLevel = await Levels.findOne({ where: { id: Number(id) } });

      res.status(200).json(updatedLevel);
    } catch (error) {
      next(error);
    }
  };

  static deleteLevel = async (req, res, next) => {
    const { id } = req.params;

    try {
      await LevelsControllers.isLevelExists(res, id);

      await Levels.destroy({ where: { id: Number(id) } });

      res.status(200).send({ success: true, message: `Level ID - ${id} deleted` });
    } catch (error) {
      next(error);
    }
  };

  static restoreLevel = async (req, res, next) => {
    const { id } = req.params;

    try {

      const levelRestored = await Levels.restore({
        where: { id: Number(id) },
      });

      if (!levelRestored) {
        return res.status(404).send({
          success: false,
          message: `Can not restore level - ID ${id}`,
        });
      }

      return res
        .status(200)
        .send({ success: true, message: `id - ${id} restored` });
    } catch (error) {
      console.error("Error in restoreLevel:", error);
      next(error);
    }
  };
}

module.exports = LevelsControllers;