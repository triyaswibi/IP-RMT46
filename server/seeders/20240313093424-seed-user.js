'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const vechile = require('../data/users.json').map(el => {
      delete el.id
      el.password = hashPassword(el.password)
      el.createdAt = el.updatedAt = new Date()
      return el
     })
  
     await queryInterface.bulkInsert('Users', vechile)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })
  }
};
