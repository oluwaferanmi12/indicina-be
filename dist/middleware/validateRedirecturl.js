"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRedirectUrl = void 0;
const url_service_1 = require("../services/url-service");
const validateRedirectUrl = (req, res, next) => {
    const { short_code } = req.params;
    if (!short_code || !(0, url_service_1.getOneUrl)(short_code)) {
        res.status(404).send({ message: "Url not found" });
    }
    next();
};
exports.validateRedirectUrl = validateRedirectUrl;
