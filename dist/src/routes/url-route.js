"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_controller_1 = require("../controllers/url-controller");
const router = (0, express_1.Router)();
router.get("/list", url_controller_1.listUrlController);
router.get("/statistics/:short_code_id", url_controller_1.statisticsUrlController);
//Encoding a url is also basically like creating a short
router.post("/encode", url_controller_1.encodeUrlController);
//Decoding a url is basically for show the equivalence of a short url
router.post("/decode", url_controller_1.decodeUrlController);
exports.default = router;
