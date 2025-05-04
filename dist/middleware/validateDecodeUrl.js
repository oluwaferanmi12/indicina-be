"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDecodeUrl = void 0;
const validate_url_1 = require("../utils/validate-url");
const validateDecodeUrl = (req, res, next) => {
    const { url } = req.body;
    const validate = (0, validate_url_1.validateUrl)(url);
    if (validate.validated) {
        // split the url to get the short code and if for any reason there's more than one path param it automatically should fail 
        // Now check if the short matches anything in the data
        const shortCode = (0, validate_url_1.extractShortCodeFromShortUrl)(url);
        console.log(shortCode, "Short code value ---- here");
        if (!shortCode) {
            res.status(400).send({ message: "invalid url" });
        }
        next();
    }
    else {
        res.status(400).send({ message: "Incorrect url sent" });
    }
};
exports.validateDecodeUrl = validateDecodeUrl;
