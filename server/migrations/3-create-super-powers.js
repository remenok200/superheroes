'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('super_powers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      heroId: {
        field: 'hero_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'superheroes',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('super_powers');
  }
}