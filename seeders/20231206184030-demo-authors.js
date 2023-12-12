'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('authors', [
      { name: 'Ashley Galvin', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Patrick Beach', createdAt: new Date(), updatedAt: new Date() },
      { name: 'MacKenzie Miller', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('authors', null, {});
  }
};
