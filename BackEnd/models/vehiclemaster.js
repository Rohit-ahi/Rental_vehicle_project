'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VehicleMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VehicleMaster.init({

    model:{
      type :  DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty : true,
        notNull : true
      }
    },
    type: {
      type :  DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty : true,
        notNull : true
      }
    },
    image: {
      type :  DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty : true,
        notNull : true
      }
    },
    capacity_seats: {
      type : DataTypes.INTEGER
    },
    capacity_tons:  {
      type : DataTypes.INTEGER
    },

    // model: DataTypes.STRING,
    // type: DataTypes.STRING,
    // image: DataTypes.STRING,
    // capacity_seats: DataTypes.INTEGER,
    // capacity_tons: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'VehicleMaster',
  });
  return VehicleMaster;
};