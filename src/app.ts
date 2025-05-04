import express from 'express';
import urlRoutes from './routes/url-route';
import cors from 'cors';
import { validateRedirectUrl } from './middleware/validateRedirecturl';
import { handleRedirect } from './controllers/url-controller';
const app = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }))



app.use("/api", urlRoutes)
app.get("/:short_code", validateRedirectUrl, handleRedirect)


export default app;