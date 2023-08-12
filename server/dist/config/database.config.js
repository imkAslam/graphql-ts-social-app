"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DataBaseSource = new typeorm_1.DataSource({
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
    synchronize: false,
});
exports.default = DataBaseSource;
//# sourceMappingURL=database.config.js.map