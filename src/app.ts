import express from "express";
import errorHandling from "./middlewares/errorHandling";
import cookieParser from "cookie-parser";
import auth from "./routers/auth";
import projectHistory from "./routers/projectHistory";
import technology from "./routers/technology";
import cors from "cors";

const app: express.Application = express();

app.use(
  cors({
    credentials: true,
    origin: ["https://muhammad-muizzuddin.vercel.app", "http://localhost:5173"],
  })
);
app.use(cookieParser("secret"));
app.use(express.urlencoded({ extended: true }));

app.use(auth);
app.use(technology);
app.use(projectHistory);
app.use(errorHandling);

export default app;
