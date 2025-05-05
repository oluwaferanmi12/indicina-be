import { Response, Request } from "express"
import { decodeUrlService, encodeUrlService, getAllUrls, getOneUrl, updateUrlVisit } from "../services/url-service"
import { EncodeUrlInterface, RedirectUrlInterface } from "../interfaces"
import { entriesDB } from "../db/entries-table"

export const decodeUrlController = (req: Request<{} , {} , EncodeUrlInterface >, res: Response) => {
    // return res.status(200)
    const {url} = req.body
    const result = decodeUrlService(url);
    res.status(200).send({url:result?.originalUrl})
}
export const encodeUrlController = async (req: Request<{}, {}, EncodeUrlInterface>, res: Response) => {
    try {
        // Do proper stripping off and validation for the url that is sent 
        
        const { url } = req.body;
        const codeGenerated = encodeUrlService(url);
        res.status(201).json(codeGenerated);
    } catch (e) {
        res.status(500).send({ message: "unexpected error" })
    }
}

export const handleRedirect = (req: Request<RedirectUrlInterface>, res: Response) => {
    const { short_code } = req.params;
    const short_code_object = getOneUrl(short_code);
    updateUrlVisit(short_code);
    return res.redirect(short_code_object?.originalUrl ?? "")
}
export const listUrlController = (req: Request, res: Response) => {
    const result = getAllUrls();
    res.status(200).send({ data: result });
}
export const statisticsUrlController = (req: Request, res: Response) => {
    console.log("Statistics of a specific url in the controller")
}
export const redirectUrlController = (req: Request, res: Response) => {
    console.log("Redirect to the url in the controller")
}
export const createUrlController = (req: Request, res: Response) => {
    console.log("Create a new url in the controller")
}


// utility functions peculiar to the url service 

