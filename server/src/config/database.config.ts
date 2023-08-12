import { DataSource } from "typeorm";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

const DataBaseSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5234,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  maxQueryExecutionTime: 1000,
  cache: false,
  logging: "all",
  logger: "advanced-console",
  entities: [__dirname + "/../**/entities/*.{ts,js}"],
  migrations: [__dirname + "/../**/migrations/**/*{.ts,.js}"],
  migrationsTableName: "typeorm_migrations",
  synchronize: false, // never use TRUE in production! it will sync the tables changes and this can override the older values in db tables
  // extra: {
  //   encrypt: true,
  //   trustServerCertificate: true,
  // },
  //ssl: false,
});
export default DataBaseSource;
