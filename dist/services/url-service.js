"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeUrlService = exports.decodeUrlService = void 0;
const nanoid_1 = require("nanoid");
const entries_table_1 = require("../db/entries-table");
const decodeUrlService = () => {
};
exports.decodeUrlService = decodeUrlService;
const encodeUrlService = () => {
    const generatedCode = (0, nanoid_1.nanoid)(6);
    entries_table_1.entriesDB.set((0, nanoid_1.nanoid)(6), {
        originalUrl: "https://google.com/search?query=hello",
        visits: 10,
        createdAt: new Date("2024-05-19T08:30:00Z"),
        short_url: "",
        updatedAt: new Date("2024-05-19T08:30:00Z")
    });
    const generatedObject = { shortCode: generatedCode, visits: 10 };
    return generatedObject;
};
exports.encodeUrlService = encodeUrlService;
