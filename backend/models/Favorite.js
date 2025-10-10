import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Word } from "./Word.js";

export const Favorite = sequelize.define("Favorite", {
  favID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Favorite.belongsTo(Word, { foreignKey: "wordID" });
Word.hasOne(Favorite, { foreignKey: "wordID" });
