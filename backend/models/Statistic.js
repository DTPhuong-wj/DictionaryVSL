import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Statistic = sequelize.define("Statistic", {
  statID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  wordCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  searchCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  favoriteCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  reportCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});
