"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUrlVisit = exports.getOneUrl = exports.encodeUrlService = exports.decodeUrlService = void 0;
const nanoid_1 = require("nanoid");
const entries_table_1 = require("../db/entries-table");
const moment_1 = __importDefault(require("moment"));
const url_config_1 = require("../config/url-config");
const decodeUrlService = () => {
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
