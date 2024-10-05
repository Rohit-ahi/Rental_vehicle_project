'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ServiceProviders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reg_number: {
        type: Sequelize.STRING,
        allowNull:false
      },
      contact_person: {
        type: Sequelize.STRING,
        allowNull:false
      },
      geo_lat: {
        type: Sequelize.FLOAT,
        allowNull:true
      },
      geo_lng: {
        type: Sequelize.FLOAT,
        allowNull:true
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull:true
      },

      user : {
        type: Sequelize.INTEGER,
        references : {
          model : "Users" , key : "id"
        }
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ServiceProviders');
  }
};