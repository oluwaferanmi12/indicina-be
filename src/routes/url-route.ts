import { Router } from "express";

const router = Router();

router.get("/list" , (req , res) => {
    console.log("List of urls");
})

router.get("/statistics/:short_code_id", (req, res) => {
    console.log("Statistics of a specific url");
})

router.post("/encode" , (req, res) => {
    console.log("Endode the url ")
})


router.post("/decode", (req , res) => {
    console.log("Decode the url")
})



export default router;