import { NextFunction, Request, Response } from "express";
import { RedirectUrlInterface } from "../interfaces";
import { getOneUrl } from "../services/url-service";

export const validateRedirectUrl = (req: Request<RedirectUrlInterface>, res: Response, next: NextFunction) => {
    const { short_code } = req.params;
    if (!short_code || !getOneUrl(short_code)) {
        res.status(404).send({ message: "Url not found" })
    }
    next()
}