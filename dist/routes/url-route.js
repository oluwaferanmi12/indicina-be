"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_controller_1 = require("../controllers/url-controller");
const validatePostUrl_1 = require("../middleware/validatePostUrl");
const validateDecodeUrl_1 = require("../middleware/validateDecodeUrl");
const router = (0, express_1.Router)();
router.get("/list", url_controller_1.listUrlController);
router.get("/statistics/:short_code_id", url_controller_1.statisticsUrlController);
//Encoding a url is also basically like creating a short
router.post("/encode", validatePostUrl_1.validateUrlRequestBody, url_controller_1.encodeUrlController);
//Decoding a url is basically for show the equivalence of a short url
router.post("/decode", validateDecodeUrl_1.validateDecodeUrl, url_controller_1.decodeUrlController);
exports.default = router;
