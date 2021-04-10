import compression from "compression";
import cookieParser from "cookie-parser";
import cookiesMiddleware from "universal-cookie-express";
import express from "express";
import net from "net";
import path from "path";
import routes from "./routes";
import morganMiddleware from "./morganMiddleware.js";

const app = express();
app.use(morganMiddleware);
// remaining-code