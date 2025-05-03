import express from 'express';
import urlRoutes from './routes/url-route';
import cors from 'cors';
const app = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/api/" , urlRoutes )


export default app;