import sequelize from "../db/index.js";

import { DataTypes } from "sequelize";

const Category = sequelize.define("category",
{  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

})

export default Category