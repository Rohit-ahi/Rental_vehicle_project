'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reg_number: {
        type: Sequelize.STRING,
        allowNull:false,
        unique : true
      },
      ispuc: {
        type: Sequelize.BOOLEAN
      },
      isinsurance: {
        type: Sequelize.BOOLEAN
      },
      fuel_type: {
        type: Sequelize.STRING,
        allowNull:false
      },
      price_km: {
        type: Sequelize.FLOAT
      },
      price_days: {
        type: Sequelize.FLOAT
      },
      ac_charges: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull:false
      },

      provider : {
        type: Sequelize.INTEGER,
        references : {
          model : "Users" , key : "id"
        }
      },
      master : {
        type: Sequelize.INTEGER,
        references : {
          model : "VehicleMasters" , key : "id"
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
    await queryInterface.dropTable('Vehicles');
  }
};

