import request from "supertest";
import  app  from "../src/app";
import { entriesDB } from "../src/db/entries-table";

describe("URL Shortener API", () => {
    beforeEach(() => {
        entriesDB.clear(); // Reset database before each test
    });

    // Test 1: Encode a valid URL
    it("encodes a URL and returns a short URL", async () => {
        const response = await request(app)
            .post("/api/encode")
            .send({ url: "https://example.com" });

        expect(response.status).toBe(201);
    });

    // Test 2: Reject invalid URL
    it("rejects invalid URLs", async () => {
        const response = await request(app)
            .post("/api/encode")
            .send({ url: "google.com" });

        expect(response.status).toBe(400);
    });

    it("redirects to original URL and tracks visits", async () => {
        // First encode a URL
        const encodeResponse = await request(app)
            .post("/api/encode")
            .send({ url: "https://google.com" });
        const shortCode = encodeResponse.body.shortCode;

        // Test redirect
        const redirectResponse = await request(app)
            .get(`/${shortCode}`)
            .redirects(0); // Don't follow redirect

        expect(redirectResponse.status).toBe(302);
        expect(redirectResponse.headers.location).toBe("https://google.com");

        // Verify visit count
        const entry = entriesDB.get(shortCode);
        expect(entry?.visits).toBe(1);
    });

    it("returns 404 for invalid short code", async () => {
        const response = await request(app).get("/invalid123");
        expect(response.status).toBe(404);
    });
});