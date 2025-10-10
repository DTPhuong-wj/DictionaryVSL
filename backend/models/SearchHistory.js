import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";

export const SearchHistory = sequelize.define("SearchHistory", {
  historyID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  word: { type: DataTypes.STRING, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

SearchHistory.belongsTo(User, { foreignKey: "userID", allowNull: true });
User.hasMany(SearchHistory, { foreignKey: "userID" });
