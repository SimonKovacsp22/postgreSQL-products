import sequelize from "../db/index.js";

import { DataTypes } from "sequelize";

const User = sequelize.define(
  "user",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    age: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
  }
);

export default User;