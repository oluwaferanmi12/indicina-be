import { ValidateUrlResponse } from "../interfaces"
import { getOneUrl } from "../services/url-service";

export const validateUrl = (url: string): ValidateUrlResponse => {
    if (!url) {
        return { message: "Url is required", validated: false }
    } else {
        // check if the url is a correct on 
        try {
            // This implicitly does the validation for the url 
            const extractedUrl = new URL(url);
            return { message: "Validated", validated: true }
        } catch (e) {
            return { validated: false, message: "Invalid url" }
        }

    }
}

export const checkShortCodeValidity = (url: string) => {
    const url_detail = new URL(url);
    const defaultUrlDetail = new URL(process.env.BASE_URL ?? "");
    const splittedPath = url_detail.pathname.split("/");
    const payloadHost = url_detail.host;
    const defaultUrlHost = defaultUrlDetail.host
    if (splittedPath.length !== 2 || payloadHost !== defaultUrlHost || url_detail.search) {
        // this is to ensure that url looks exactly as the format of the shor url
        return false
    }
    return true
}

export const extractShortCodeFromShortUrl = (url: string) => {
    if (!checkShortCodeValidity(url)) return null;
    const urlDetail = new URL(url);
    const splittedPath = urlDetail.pathname.split("/");
    const shortCode = splittedPath[1];
    const url_obj = getOneUrl(shortCode);
    if(!url_obj){
        return null
    }
    return shortCode;
}

export const extractShortCodeAfterValidate = (url: string) => {
    const urlDetail = new URL(url);
    const splittedPath = urlDetail.pathname.split("/");
    const shortCode = splittedPath[1];
    const url_obj = getOneUrl(shortCode);
    if (!url_obj) {
        return null
    }
    return shortCode;
    
}