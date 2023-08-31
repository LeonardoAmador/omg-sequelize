/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const classes = [
      {
        start_date: "2020-02-01",
        instructor_id: 6,
        level_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start_date: "2020-02-01",
        instructor_id: 5,
        level_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start_date: "2020-02-01",
        instructor_id: 6,
        level_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start_date: "2020-07-01",
        instructor_id: 6,
        level_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Classes", classes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Classes", null, {});
  },
};
