import { Router } from "express";
import { decodeUrlController, encodeUrlController, listUrlController, statisticsUrlController } from "../controllers/url-controller";

const router = Router();

router.get("/list" , listUrlController);

router.get("/statistics/:short_code_id", statisticsUrlController)

//Encoding a url is also basically like creating a short
router.post("/encode" , encodeUrlController)

//Decoding a url is basically for show the equivalence of a short url
router.post("/decode", decodeUrlController)



export default router;