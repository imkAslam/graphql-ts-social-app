"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = bcrypt_1.default.hashSync(password, saltRounds);
    return hashedPassword;
}
exports.hashPassword = hashPassword;
function matchPassword(password, otherPassword) {
    const result = bcrypt_1.default.compare(password, otherPassword);
    return result;
}
exports.matchPassword = matchPassword;
//# sourceMappingURL=index.js.map