export interface UrlInterface {
    originalUrl: string;
    visits: number;
    createdAt: Date;
    updatedAt: Date;
    short_url: string;

}

export interface EncodeUrlInterface {
    url: string;
}

export interface ValidateUrlResponse {
    message: string;
    validated: boolean;
}