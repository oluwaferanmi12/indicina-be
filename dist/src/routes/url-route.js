"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/list", (req, res) => {
    console.log("List of urls");
});
router.get("/statistics/:short_code_id", (req, res) => {
    console.log("Statistics of a specific url");
});
router.post("/encode", (req, res) => {
    console.log("Endode the url ");
});
router.post("/decode", (req, res) => {
    console.log("Decode the url");
});
exports.default = router;
