import { nanoid } from "nanoid"
import { entriesDB } from "../db/entries-table"

export const decodeUrlService = () => {

}

export const encodeUrlService = () => {
    const generatedCode = nanoid(6);
    entriesDB.set(nanoid(6), {
        originalUrl: "https://google.com/search?query=hello",
        visits: 10,
        createdAt: new Date("2024-05-19T08:30:00Z"),
        short_url: "",
        updatedAt: new Date("2024-05-19T08:30:00Z")
    })
    const generatedObject = { shortCode: generatedCode, visits: 10 }
    return generatedObject
}

