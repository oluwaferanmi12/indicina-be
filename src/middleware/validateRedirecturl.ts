import { NextFunction, Request, Response } from "express";
import { RedirectUrlInterface } from "../interfaces";

export const ValidateRedirectUrl = (req:Request<RedirectUrlInterface> , res:Response , next:NextFunction) => {
    const {short_code} = req.params;
    
    
    next()
}