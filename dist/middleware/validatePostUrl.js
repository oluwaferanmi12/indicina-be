"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUrlRequestBody = void 0;
const validate_url_1 = require("../utils/validate-url");
const validateUrlRequestBody = (req, res, next) => {
    const { url } = req.body;
    const validatedObj = (0, validate_url_1.validateUrl)(url);
    if (!validatedObj.validated) {
        res.status(400).send({ message: validatedObj.message });
    }
    next();
};
exports.validateUrlRequestBody = validateUrlRequestBody;
