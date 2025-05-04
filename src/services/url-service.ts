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
        short_url: `${DEFAULT_BASE_URL+generatedCode}`,
        updatedAt: moment.utc()
    }
    entriesDB.set(generatedCode, newUrlObject);
    return newUrlObject
}

