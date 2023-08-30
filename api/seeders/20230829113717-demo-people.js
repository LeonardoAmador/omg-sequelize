"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "People",
      [
        {
          name: "John Doe",
          active: true,
          email: "john@example.com",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Smith",
          active: true,
          email: "jane@example.com",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alice Johnson",
          active: true,
          email: "alice@example.com",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bob Anderson",
          active: true,
          email: "bob@example.com",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Eve White",
          active: true,
          email: "eve@example.com",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("People", null, {});
  },
};
