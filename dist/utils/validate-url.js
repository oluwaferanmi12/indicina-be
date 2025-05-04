"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUrl = void 0;
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
