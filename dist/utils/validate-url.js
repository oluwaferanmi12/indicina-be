"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractShortCodeAfterValidate = exports.extractShortCodeFromShortUrl = exports.checkShortCodeValidity = exports.validateUrl = void 0;
const url_service_1 = require("../services/url-service");
const validateUrl = (url) => {
    if (!url) {
        return { message: "Url is required", validated: false };
    }
    else {
        // check if the url is a correct on 
        try {
            // This implicitly does the validation for the url 
            const extractedUrl = new URL(url);
            return { message: "Validated", validated: true };
        }
        catch (e) {
            return { validated: false, message: "Invalid url" };
        }
    }
};
exports.validateUrl = validateUrl;
const checkShortCodeValidity = (url) => {
    var _a;
    const url_detail = new URL(url);
    const defaultUrlDetail = new URL((_a = process.env.BASE_URL) !== null && _a !== void 0 ? _a : "");
    const splittedPath = url_detail.pathname.split("/");
    const payloadHost = url_detail.host;
    const defaultUrlHost = defaultUrlDetail.host;
    if (splittedPath.length !== 2 || payloadHost !== defaultUrlHost || url_detail.search) {
        // this is to ensure that url looks exactly as the format of the shor url
        return false;
    }
    return true;
};
exports.checkShortCodeValidity = checkShortCodeValidity;
const extractShortCodeFromShortUrl = (url) => {
    if (!(0, exports.checkShortCodeValidity)(url))
        return null;
    const urlDetail = new URL(url);
    const splittedPath = urlDetail.pathname.split("/");
    const shortCode = splittedPath[1];
    const url_obj = (0, url_service_1.getOneUrl)(shortCode);
    if (!url_obj) {
        return null;
    }
    return shortCode;
};
exports.extractShortCodeFromShortUrl = extractShortCodeFromShortUrl;
const extractShortCodeAfterValidate = (url) => {
    const urlDetail = new URL(url);
    const splittedPath = urlDetail.pathname.split("/");
    const shortCode = splittedPath[1];
    const url_obj = (0, url_service_1.getOneUrl)(shortCode);
    if (!url_obj) {
        return null;
    }
    return shortCode;
};
exports.extractShortCodeAfterValidate = extractShortCodeAfterValidate;
