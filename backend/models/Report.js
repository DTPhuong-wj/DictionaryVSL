// models/Report.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Report = sequelize.define("Report", {
  reportID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userID: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "pending" }, // pending, resolved
  createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, { tableName: "reports" });
