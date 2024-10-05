'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VehicleRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
         VehicleRequest.belongsTo(models.User, {
            foreignKey: 'customer', as:'user'
         })
         VehicleRequest.belongsTo(models.VehicleMaster, {
             foreignKey:'vmaster', as:'vm'
         }) 

    }
  }

  VehicleRequest.init({

    start_date:  {
        type : DataTypes.DATE ,
        allowNull : false ,
        validate : {
            isDate : true
        }  
    },
    
    pick_location: {
     type : DataTypes.STRING,
     allowNull:false,
     validate : {
         len : [3,200] 
     }
    },

    drop_location:  {
        type :DataTypes.STRING,
        allowNull:false ,
        validate : {
          len:[3,200]
        }
    },

    days:  {
        type : DataTypes.INTEGER,
        allowNull : false,
        validate : {
            isInt : true,
            min : 1
        }
    },

    geo_lat: {
      type  :DataTypes.FLOAT
    },
    geo_lng: {
      type  :DataTypes.FLOAT
    },
    status: {
      type  : DataTypes.BOOLEAN,
      allowNull : false
    },
    

  }, {
    sequelize,
    modelName: 'VehicleRequest',
  });
  return VehicleRequest;
};