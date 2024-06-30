'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Item, { foreignKey: 'item_id', as: 'item' });
      Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  Order.init({
    order_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    item_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'items',
        key: 'item_id'
      }
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    status: {
      type: DataTypes.ENUM,
      values: ['IN_CART', 'PAID', 'IN_PROCESS', 'ON_DELIVERY', 'DELIVERED', 'CANCELLED', 'INITIAL'],
      allowNull: false,
      defaultValue: 'INITIAL'
    }
  }, {
    sequelize,
    modelName: 'Order',
    underscored: true
  });
  return Order;
};