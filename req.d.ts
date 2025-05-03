import * as express from "express-serve-static-core"

export interface UserInterface {
    name: string;
    email: string;
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user: UserInterface
        }
    }
}