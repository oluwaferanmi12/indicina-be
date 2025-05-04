import { Response, Request } from "express"
import { encodeUrlService } from "../services/url-service"

export const decodeUrlController = (req: Request, res: Response) => {
    console.log("Encode the url in the controller")
    // return res.status(200)
}
export const encodeUrlController = async (req: Request, res: Response) => {
    try {
        console.log(req.body.url)
        // Do proper stripping off and validation for the url that is sent 
        
        const codeGenerated = encodeUrlService();
        res.status(200).json(codeGenerated);
    } catch (e) {
        res.status(500).send()
    }
}
export const listUrlController = (req: Request, res: Response) => {
    console.log("List of urls in the controller")
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

