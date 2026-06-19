import express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import routes from "./routes";
import morgan from "morgan";

import { errorLoggerMiddleware } from "./middlewares/errorLogger.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";
const app = express();

app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:8080",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console logging
app.use(morgan("dev"));

// logger
app.use(loggerMiddleware);

// route
const router = Router();

router.get("/error", (req, res, next) => {
  next(new Error("TEST ERROR"));
});

app.use("/api", routes);

// error logger
app.use(errorLoggerMiddleware);

export default app;
