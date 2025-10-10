// models/SearchHistory.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const SearchHistory = sequelize.define(
  "SearchHistory",
  {
    historyID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userID: { type: DataTypes.INTEGER, allowNull: true },
    word: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { timestamps: false }
);
