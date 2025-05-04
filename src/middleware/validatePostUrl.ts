import { NextFunction, Request, Response } from "express";
import { EncodeUrlInterface } from "../interfaces";
import { validateUrl } from "../utils/validate-url";

export const validateUrlRequestBody = (req:Request<{}, {} , EncodeUrlInterface>, res:Response  , next:NextFunction) => {
    const {url} = req.body;
    const validatedObj = validateUrl(url)
     if(!validatedObj.validated){
        res.status(400).send({message: validatedObj.message})
     }
    next() 
}