import 'express'; // Important for module augmentation

declare global {
    namespace Express {
        interface Request {
            short_code: string | null; // Remove null if you always set it
        }
    }
}