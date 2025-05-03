"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeUrlService = exports.decodeUrlService = void 0;
const nanoid_1 = require("nanoid");
const decodeUrlService = () => {
};
exports.decodeUrlService = decodeUrlService;
const encodeUrlService = () => {
    return (0, nanoid_1.nanoid)(10);
};
exports.encodeUrlService = encodeUrlService;
