module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    const levels = [
      {
        level_desc: "beginner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        level_desc: "intermediate",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        level_desc: "advanced",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Levels", levels, {});
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Levels", null, {});
  },
};
