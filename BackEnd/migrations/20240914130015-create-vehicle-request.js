'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VehicleRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull:false
      },
      pick_location: {
        type: Sequelize.STRING,
        allowNull:false
      },
      drop_location: {
        type: Sequelize.STRING,
        allowNull:false
      },
      days: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      geo_lat: {
        type: Sequelize.FLOAT
      },
      geo_lng: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull:false
      },

     customer : {
         type : Sequelize.INTEGER,
         references : {
            model:'Users' , key : 'id'
         }
     },

     vmaster : {
         type : Sequelize.INTEGER,
         references: {
            model:'VehicleMasters',key:'id'
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
    await queryInterface.dropTable('VehicleRequests');
  }
};