"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUrlController = exports.redirectUrlController = exports.statisticsUrlController = exports.listUrlController = exports.encodeUrlController = exports.decodeUrlController = void 0;
const url_service_1 = require("../services/url-service");
const decodeUrlController = (req, res) => {
    console.log("Encode the url in the controller");
    // return res.status(200)
};
exports.decodeUrlController = decodeUrlController;
const encodeUrlController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Do proper stripping off and validation for the url that is sent 
        const { url } = req.body;
        const codeGenerated = (0, url_service_1.encodeUrlService)();
        res.status(200).json(codeGenerated);
    }
    catch (e) {
        res.status(500).send();
    }
});
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
// utility functions peculiar to the url service 
