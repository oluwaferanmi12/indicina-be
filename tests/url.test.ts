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
        const response = await request(app).get("/invalid1-url-test");
        expect(response.status).toBe(404);
    });

    it("decodes a short URL and returns the original URL", async () => {
        // Step 1: Encode a URL first
        const encodeResponse = await request(app)
            .post("/api/encode")
            .send({ url: "https://google.com" });

        expect(encodeResponse.status).toBe(201);
        const shortUrl = encodeResponse.body.short_url;
        console.log(encodeResponse.body , "Short Url value here on the test")

        // Step 2: Send the shortUrl to the /decode endpoint
        const decodeResponse = await request(app)
            .post("/api/decode")
            .send({ url: shortUrl });

        expect(decodeResponse.status).toBe(200);
        expect(decodeResponse.body).toHaveProperty("url", "https://google.com");
    });

    it("returns 400 for malformed short URL", async () => {
        const response = await request(app)
            .post("/api/decode")
            .send({ url: "not-a-valid-url" });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Incorrect url sent");
    });

    it("returns 400 for unknown short code", async () => {
        const fakeShortUrl = "http://localhost:3000/fake123";

        const response = await request(app)
            .post("/decode")
            .send({ url: fakeShortUrl });

        expect(response.status).toBe(404);
    });

   
});