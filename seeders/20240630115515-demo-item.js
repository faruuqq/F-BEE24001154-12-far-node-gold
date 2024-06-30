const uuidv4 = require('uuid').v4;
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('items', [
      {
        item_id: uuidv4(),
        name: 'A unique item',
        price: 204562,
        stock: 24,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        item_id: uuidv4(),
        name: 'A very unique item',
        price: 99012732,
        stock: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        item_id: uuidv4(),
        name: 'A super unique item',
        price: 1111,
        stock: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        item_id: uuidv4(),
        name: 'A god-like unique item',
        price: 9999999999,
        stock: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        item_id: uuidv4(),
        name: 'A whatever item',
        price: 0,
        stock: 9999999,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('items', null, {});
  }
};
