'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceProvider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ServiceProvider.belongsTo(models.User,{
        foreignKey:'user', as:'userrec'
        })

    }
  }
  ServiceProvider.init({

    company_name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty : true,
        notNull : true
      }
    },
    address: {
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty : true,
        notNull : true
      }
    },
    contact: {
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty : true,
        notNull : true,
        len : [10,10]
      }
    },
    reg_number: {
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty : true,
        notNull : true
      }
    },
    contact_person: {
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty : true,
        notNull : true
      }
    },
    geo_lat: {
      type  :DataTypes.FLOAT
    },
    geo_lng: {
      type  :DataTypes.FLOAT
    },
    rating: {
      type  :DataTypes.FLOAT
    },







    // company_name: DataTypes.STRING,
    // address: DataTypes.STRING,
    // contact: DataTypes.STRING,
    // reg_number: DataTypes.STRING,
    // contact_person: DataTypes.STRING,
    // geo_lat: DataTypes.FLOAT,
    // geo_lng: DataTypes.FLOAT,
    // rating: DataTypes.FLOAT



  }, {
    sequelize,
    modelName: 'ServiceProvider',
  });
  return ServiceProvider;
};