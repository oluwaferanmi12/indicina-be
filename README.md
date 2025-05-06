# URL Shortener API

## Overview
This project is a **URL Shortener API** built with **Node.js**, **Express**, and **TypeScript**. It provides functionality to:
- Encode a long URL into a short URL.
- Decode a short URL back to its original URL.
- Redirect to the original URL using the short URL.
- Track statistics such as the number of visits to a short URL.
- List all stored URLs.

---

## How the Code Works

### 1. **Application Entry Point**
- **File**: `src/server.ts`
- **Purpose**: Starts the Express server on the specified port (default: `8000`).
- **Key Code**:
    ```typescript
    app.listen(PORT, () => {
        console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
    ```

### 2. **Application Configuration**
- **File**: `src/app.ts`
- **Purpose**: Configures the Express app with middleware, routes, and error handling.
- **Key Features**:
    - **CORS**: Enables cross-origin requests.
    - **JSON Parsing**: Parses incoming JSON payloads.
    - **Routes**: Mounts the API routes under `/api` and handles redirects for short URLs.

    ```typescript
    app.use("/api", urlRoutes);
    app.get("/:short_code", validateRedirectUrl, handleRedirect);
    ```

### 3. **Routes**
- **File**: `src/routes/url-route.ts`
- **Purpose**: Defines the API endpoints for encoding, decoding, listing, and retrieving statistics for URLs.
- **Endpoints**:
    - `POST /api/encode`: Encodes a long URL into a short URL.
    - `POST /api/decode`: Decodes a short URL back to its original URL.
    - `GET /api/list`: Lists all stored URLs.
    - `GET /api/statistics/:short_code_id`: Retrieves statistics for a specific short URL.

    ```typescript
    router.post("/encode", validateUrlRequestBody, encodeUrlController);
    router.post("/decode", validateDecodeUrl, decodeUrlController);
    ```

### 4. **Controllers**
- **File**: `src/controllers/url-controller.ts`
- **Purpose**: Handles the logic for each API endpoint by interacting with services and sending responses.
- **Key Controllers**:
    - `encodeUrlController`: Encodes a long URL into a short URL.
    - `decodeUrlController`: Decodes a short URL back to its original URL.
    - `handleRedirect`: Redirects to the original URL using the short URL.
    - `listUrlController`: Lists all stored URLs.

    ```typescript
    export const encodeUrlController = async (req: Request, res: Response) => {
        try {
            const { url } = req.body;
            const codeGenerated = encodeUrlService(url);
            res.status(201).json(codeGenerated);
        } catch (e) {
            res.status(500).send({ message: "unexpected error" });
        }
    };
    ```

### 5. **Services**
- **File**: `src/services/url-service.ts`
- **Purpose**: Contains the business logic for encoding, decoding, and managing URLs.
- **Key Functions**:
    - `encodeUrlService`: Generates a short URL and stores it in the database.
    - `decodeUrlService`: Retrieves the original URL from the short URL.
    - `getAllUrls`: Returns all stored URLs.
    - `updateUrlVisit`: Increments the visit count for a short URL.

    ```typescript
    export const encodeUrlService = (url: string) => {
        const generatedCode = nanoid(SHORT_CODE_LENGTH);
        const DEFAULT_BASE_URL = process.env.BASE_URL;
        const newUrlObject = {
            originalUrl: url,
            visits: 0,
            createdAt: moment.utc(),
            short_url: `${DEFAULT_BASE_URL + generatedCode}`,
            updatedAt: moment.utc(),
            shortCode: generatedCode
        };
        entriesDB.set(generatedCode, newUrlObject);
        return newUrlObject;
    };
    ```

### 6. **Middleware**
- **Files**:
    - `src/middleware/validatePostUrl.ts`
    - `src/middleware/validateDecodeUrl.ts`
    - `src/middleware/validateRedirecturl.ts`
- **Purpose**: Validates incoming requests to ensure they meet the required format and constraints.
- **Examples**:
    - `validateUrlRequestBody`: Ensures the `url` field in the request body is valid.
    - `validateDecodeUrl`: Validates the short URL before decoding.
    - `validateRedirectUrl`: Ensures the short code exists before redirecting.

    ```typescript
    export const validateUrlRequestBody = (req: Request<{}, {}, EncodeUrlInterface>, res: Response, next: NextFunction) => {
        const { url } = req.body;
        const validatedObj = validateUrl(url);
        if (!validatedObj.validated) {
            res.status(400).send({ message: validatedObj.message });
        }
        next();
    };
    ```

### 7. **Database**
- **File**: `src/db/entries-table.ts`
- **Purpose**: Simulates a database using a `Map` to store URL entries.
- **Example**:
    ```typescript
    export const entriesDB = new Map<string, UrlInterface>();
    ```

### 8. **Utilities**
- **File**: `src/utils/validate-url.ts`
- **Purpose**: Provides helper functions for validating and extracting information from URLs.
- **Key Functions**:
    - `validateUrl`: Validates if a string is a valid URL.
    - `extractShortCodeFromShortUrl`: Extracts the short code from a short URL.

---

## Running the Project

### Prerequisites
- **Node.js** (v16 or later)
- **npm** (v8 or later)

### Steps
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd indicina-BE
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the tests:
    ```bash
    npm test
    ```

### Starting the Project

#### Development Mode
To start the project in development mode with hot-reloading:
```bash
npm run start:dev
```

#### Production Mode
To build and start the project in production mode:
1. Build the project:
    ```bash
    npm run build
    ```
2. Start the server:
    ```markdown
    ### Tests

    The project includes unit and integration tests to ensure the functionality of the API. Below are some examples:

    1. **Encoding a URL**
        - **Description**: Verifies that a long URL is successfully encoded into a short URL.
        - **Test File**: `tests/encode-url.test.ts`
        - **Example**:
          ```typescript
          it("should encode a long URL into a short URL", async () => {
                const response = await request(app)
                     .post("/api/encode")
                     .send({ url: "https://example.com" });
                expect(response.status).toBe(201);
                expect(response.body).toHaveProperty("short_url");
          });
          ```

    2. **Decoding a URL**
        - **Description**: Ensures that a short URL is correctly decoded back to its original URL.
        - **Test File**: `tests/decode-url.test.ts`
        - **Example**:
          ```typescript
          it("should decode a short URL to its original URL", async () => {
                const response = await request(app)
                     .post("/api/decode")
                     .send({ short_url: "http://localhost:8000/abc123" });
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("originalUrl");
          });
          ```

    3. **Redirecting to Original URL**
        - **Description**: Tests that accessing a short URL redirects to the original URL.
        - **Test File**: `tests/redirect-url.test.ts`
        - **Example**:
          ```typescript
          it("should redirect to the original URL", async () => {
                const response = await request(app).get("/abc123");
                expect(response.status).toBe(302);
                expect(response.header.location).toBe("https://example.com");
          });
          ```

    4. **Listing All URLs**
        - **Description**: Confirms that all stored URLs are listed correctly.
        - **Test File**: `tests/list-urls.test.ts`
        - **Example**:
          ```typescript
          it("should list all stored URLs", async () => {
                const response = await request(app).get("/api/list");
                expect(response.status).toBe(200);
                expect(response.body).toBeInstanceOf(Array);
          });
          ```

    5. **Statistics for a Short URL**
        - **Description**: Validates that the statistics for a specific short URL are retrieved accurately.
        - **Test File**: `tests/statistics.test.ts`
        - **Example**:
          ```typescript
          it("should retrieve statistics for a short URL", async () => {
                const response = await request(app).get("/api/statistics/abc123");
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("visits");
          });
          ```
    ```