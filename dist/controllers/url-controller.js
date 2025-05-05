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
exports.createUrlController = exports.redirectUrlController = exports.statisticsUrlController = exports.listUrlController = exports.handleRedirect = exports.encodeUrlController = exports.decodeUrlController = void 0;
const url_service_1 = require("../services/url-service");
const decodeUrlController = (req, res) => {
    // return res.status(200)
    const { url } = req.body;
    const result = (0, url_service_1.decodeUrlService)(url);
    res.status(200).send({ url: result === null || result === void 0 ? void 0 : result.originalUrl });
};
exports.decodeUrlController = decodeUrlController;
const encodeUrlController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Do proper stripping off and validation for the url that is sent 
        console.log(req, "Request for data");
        const { url } = req.body;
        const codeGenerated = (0, url_service_1.encodeUrlService)(url);
        res.status(201).json(codeGenerated);
    }
    catch (e) {
        res.status(500).send({ message: "unexpected error" });
    }
});
exports.encodeUrlController = encodeUrlController;
const handleRedirect = (req, res) => {
    var _a;
    const { short_code } = req.params;
    const short_code_object = (0, url_service_1.getOneUrl)(short_code);
    (0, url_service_1.updateUrlVisit)(short_code);
    return res.redirect((_a = short_code_object === null || short_code_object === void 0 ? void 0 : short_code_object.originalUrl) !== null && _a !== void 0 ? _a : "");
};
exports.handleRedirect = handleRedirect;
const listUrlController = (req, res) => {
    const result = (0, url_service_1.getAllUrls)();
    res.status(200).send({ data: result });
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
