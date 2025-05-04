"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRedirectUrl = void 0;
const ValidateRedirectUrl = (req, res, next) => {
    const { short_code } = req.params;
    next();
};
exports.ValidateRedirectUrl = ValidateRedirectUrl;
