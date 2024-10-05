'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Vehicles.belongsTo(models.User,{
        foreignKey:"provider", as:"user"
    })

    Vehicles.belongsTo(models.VehicleMaster,{
      foreignKey: "master" , as : "veh_master"
     })

    }
  }

  Vehicles.init({

    reg_number: {
      type  : DataTypes.STRING,
      allowNull : false
    },
    ispuc: {
      type  : DataTypes.BOOLEAN
    },
    isinsurance: {
      type  : DataTypes.BOOLEAN
    },
    fuel_type: {
      type  : DataTypes.STRING,
      allowNull : false
    },
    price_km: {
      type  : DataTypes.FLOAT
    },
    price_days: {
      type  : DataTypes.FLOAT
    },
    ac_charges: {
      type  : DataTypes.INTEGER,
      allowNull : true
    },
    status: {
      type  : DataTypes.BOOLEAN,
      allowNull : false
    },
    
    // reg_number: DataTypes.STRING,
    // ispuc: DataTypes.BOOLEAN,
    // isinsurance: DataTypes.BOOLEAN,
    // fuel_type: DataTypes.STRING,
    // price_km: DataTypes.FLOAT,
    // price_days: DataTypes.FLOAT,
    // ac_charges: DataTypes.INTEGER,
    // status: DataTypes.BOOLEAN


  }, {
    sequelize,
    modelName: 'Vehicles',
  });
  return Vehicles;
};