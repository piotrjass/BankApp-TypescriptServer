// import express, { Express } from "express";
// const userRouter = require("./routes/userRoutes");
// const app: Express = express();
// const routers = [userRouter];
// routers.forEach((router) => {
//   app.use("/api/v1", router);
// });
// export default app;
import express, { Express } from "express";
import userRouter from "./routes/userRoutes";
const app: Express = express();

app.use("/api/v1", userRouter);

export default app;
