import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import routes from "./routes";
import morgan from "morgan";

import { loggerMiddleware } from "./middlewares/logger.middleware";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";
const app = express();

app.use(cors());

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(loggerMiddleware);

app.use("/api", routes);

app.use(errorHandlerMiddleware);

export default app;
