import { Moment } from "moment";

export interface UrlInterface {
    originalUrl: string;
    visits: number;
    createdAt: Moment;
    updatedAt: Moment;
    short_url: string;

}

export interface EncodeUrlInterface {
    url: string;
}

export interface ValidateUrlResponse {
    message: string;
    validated: boolean;
}

export interface RedirectUrlInterface{
    short_code: string;
}