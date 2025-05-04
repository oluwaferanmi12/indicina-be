import { nanoid } from "nanoid"
import { entriesDB } from "../db/entries-table"
import moment from "moment";

export const decodeUrlService = () => {

}

export const encodeUrlService = (url: string) => {
    const generatedCode = nanoid(6);
    const DEFAULT_BASE_URL = process.env.SHORT_URL_BASE_URL;
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

