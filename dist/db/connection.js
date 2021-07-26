"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASS || '', {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: +(process.env.DB_PORT || -1),
    logging: false
});
exports.default = db;
//# sourceMappingURL=connection.js.map