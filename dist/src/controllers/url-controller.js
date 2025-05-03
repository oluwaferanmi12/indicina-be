"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUrlController = exports.redirectUrlController = exports.statisticsUrlController = exports.listUrlController = exports.encodeUrlController = exports.decodeUrlController = void 0;
const url_service_1 = require("../services/url-service");
const decodeUrlController = (req, res) => {
    console.log("Encode the url in the controller");
    // return res.status(200)
};
exports.decodeUrlController = decodeUrlController;
const encodeUrlController = (req, res) => {
    const codeGenerated = (0, url_service_1.encodeUrlService)();
    // return res.status(200).json(codeGenerated)
};
exports.encodeUrlController = encodeUrlController;
const listUrlController = (req, res) => {
    console.log("List of urls in the controller");
};
exports.listUrlController = listUrlController;
const statisticsUrlController = (req, res) => {
    console.log("Statistics of a specific url in the controller");
};
exports.statisticsUrlController = statisticsUrlController;
const redirectUrlController = (req, res) => {
    console.log("Redirect to the url in the controller");
};
exports.redirectUrlController = redirectUrlController;
const createUrlController = (req, res) => {
    console.log("Create a new url in the controller");
};
exports.createUrlController = createUrlController;
