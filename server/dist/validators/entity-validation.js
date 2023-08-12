"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
async function ValidateEntity(object) {
    const errors = [];
    const validationErrors = await (0, class_validator_1.validate)(object);
    if (validationErrors.length > 0) {
        validationErrors.forEach((error) => {
            const errObj = error?.constraints;
            const errorMessage = Object.values(errObj).join(", ");
            errors.push(errorMessage);
        });
    }
    return { isValid: errors.length === 0, errors };
}
exports.default = ValidateEntity;
//# sourceMappingURL=entity-validation.js.map