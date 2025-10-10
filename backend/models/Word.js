import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Category } from "./Category.js";

export const Word = sequelize.define("Word", {
  wordID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  word: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  video_url: { type: DataTypes.STRING(255), allowNull: false },
}, { timestamps: true });

Word.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Word, { foreignKey: "category_id" });
