/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const enrollments = [
      {
        status: "canceled",
        student_id: 1,
        class_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "confirmed",
        student_id: 2,
        class_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "confirmed",
        student_id: 3,
        class_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "canceled",
        student_id: 4,
        class_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await queryInterface.bulkInsert("Enrollments", enrollments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Enrollments", null, {});
  },
};
