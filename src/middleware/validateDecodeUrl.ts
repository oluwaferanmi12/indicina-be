import { NextFunction, Request, Response } from "express";
import { EncodeUrlInterface } from "../interfaces";
import { checkShortCodeValidity, extractShortCodeFromShortUrl, validateUrl } from "../utils/validate-url";

export const validateDecodeUrl = (req: Request<{}, {}, EncodeUrlInterface >, res: Response , next:NextFunction) => {
    const {url} = req.body;
    console.log(url , "Url Value here")
    const validate = validateUrl(url);

    if(validate.validated ){
        // split the url to get the short code and if for any reason there's more than one path param it automatically should fail 
        // Now check if the short matches anything in the data
        const shortCode = extractShortCodeFromShortUrl(url);
        if(!shortCode){
            res.status(400).send({message: "invalid url"});
        }
        next();
    }else{
        res.status(400).send({message: "Incorrect url sent"})
    }
}