import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

const CartProduct = sequelize.define(
    "cart_product", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  }
  
});

export default CartProduct;