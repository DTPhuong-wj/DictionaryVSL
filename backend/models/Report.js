import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";
import { Word } from "./Word.js";

export const Report = sequelize.define("Report", {
  reportID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  message: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.ENUM("pending", "resolved"), defaultValue: "pending" },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Report.belongsTo(User, { foreignKey: "userID" });
Report.belongsTo(Word, { foreignKey: "wordID" });
