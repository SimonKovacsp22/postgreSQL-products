import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

const Cart = sequelize.define(
    "cart", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: DataTypes.UUIDV4,
  }
});

export default Cart;