import { nanoid } from "nanoid"
import { entriesDB } from "../db/entries-table"
import moment from "moment";
import { SHORT_CODE_LENGTH } from "../config/url-config";

export const decodeUrlService = () => {

}

export const encodeUrlService = (url: string) => {
    const generatedCode = nanoid(SHORT_CODE_LENGTH);
    const DEFAULT_BASE_URL = process.env.BASE_URL;
    const newUrlObject = {
        originalUrl: url,
        visits: 0,
        createdAt: moment.utc(),
        short_url: `${DEFAULT_BASE_URL + generatedCode}`,
        updatedAt: moment.utc()
    }
    entriesDB.set(generatedCode, newUrlObject);
    return newUrlObject
}

export const getOneUrl = (short_code: string) => {
    return entriesDB.get(short_code);
}

export const updateUrlVisit =  (short_code: string) => {
    const urlDetail = getOneUrl(short_code);
    if(urlDetail){
        entriesDB.set(short_code , {
            ...urlDetail,
            visits: urlDetail.visits + 1,
            updatedAt: moment.utc()
        } )
       
    }
}


