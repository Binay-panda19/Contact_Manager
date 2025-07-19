import express from "express";
import dotenv from "dotenv";
import contactRouter from "./routes/contact.routes.js";
import userRouter from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

connectDB();

const app = express();

app.use(express.json({ limit: "16kb" }));

app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT: ${process.env.PORT}`);
});
