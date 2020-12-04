import express from "express";
import { publisherRouter, seriesRouter, issueRouter } from "./routes";
import bodyParser from "body-parser";
import cors from 'cors';
import errorHandler from "./middleware/error-handler";

const server = express();
const port = 8000;

// Middleware
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(errorHandler);

// Routes
server.use(publisherRouter.default);
server.use(seriesRouter.default);
server.use(issueRouter.default);
// entry point
server.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

export default server;