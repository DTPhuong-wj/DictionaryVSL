import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, 
  }
);

try {
  await sequelize.authenticate();
  console.log("Kết nối MySQL thành công!");
} catch (error) {
  console.error("Kết nối thất bại:", error);
}
