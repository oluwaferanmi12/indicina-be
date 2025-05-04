import { ValidateUrlResponse } from "../interfaces"

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