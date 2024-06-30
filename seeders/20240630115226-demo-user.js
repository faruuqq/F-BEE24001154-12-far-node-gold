const uuidv4 = require('uuid').v4;
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        user_id: uuidv4(),
        name: 'John Doe',
        email: 'johndoe@email.com',
        password_hash: 'just-demo-account1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: uuidv4(),
        name: 'Doe John',
        email: 'doejohn@email.com',
        password_hash: 'just-demo-account2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: uuidv4(),
        name: 'Not John Doe',
        email: 'notjohndoe@email.com',
        password_hash: 'just-demo-account3',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
