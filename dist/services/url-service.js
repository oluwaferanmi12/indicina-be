"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUrls = exports.updateUrlVisit = exports.getOneUrl = exports.encodeUrlService = exports.decodeUrlService = void 0;
const nanoid_1 = require("nanoid");
const entries_table_1 = require("../db/entries-table");
const moment_1 = __importDefault(require("moment"));
const url_config_1 = require("../config/url-config");
const validate_url_1 = require("../utils/validate-url");
const decodeUrlService = (url) => {
    const shortCode = (0, validate_url_1.extractShortCodeAfterValidate)(url);
    return (0, exports.getOneUrl)(shortCode !== null && shortCode !== void 0 ? shortCode : "");
};
exports.decodeUrlService = decodeUrlService;
const encodeUrlService = (url) => {
    const generatedCode = (0, nanoid_1.nanoid)(url_config_1.SHORT_CODE_LENGTH);
    const DEFAULT_BASE_URL = process.env.BASE_URL;
    const newUrlObject = {
        originalUrl: url,
        visits: 0,
        createdAt: moment_1.default.utc(),
        short_url: `${DEFAULT_BASE_URL + generatedCode}`,
        updatedAt: moment_1.default.utc()
    };
    entries_table_1.entriesDB.set(generatedCode, newUrlObject);
    return newUrlObject;
};
exports.encodeUrlService = encodeUrlService;
const getOneUrl = (short_code) => {
    return entries_table_1.entriesDB.get(short_code);
};
exports.getOneUrl = getOneUrl;
const updateUrlVisit = (short_code) => {
    const urlDetail = (0, exports.getOneUrl)(short_code);
    if (urlDetail) {
        entries_table_1.entriesDB.set(short_code, Object.assign(Object.assign({}, urlDetail), { visits: urlDetail.visits + 1, updatedAt: moment_1.default.utc() }));
    }
};
exports.updateUrlVisit = updateUrlVisit;
const getAllUrls = () => {
    const urls = Array.from(entries_table_1.entriesDB.entries()).map(([key, value]) => (Object.assign({ short_code: key }, value)));
    return urls;
};
exports.getAllUrls = getAllUrls;
