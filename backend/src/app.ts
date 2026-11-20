import express from "express";

import userRoutes from "./routes/user.routes.js";
import systemRoutes from "./routes/system.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express(); //express() creates an Express application.

app.use(express.json()); //parses incoming JSON request bodies and makes the parsed value available through req.body.

app.use(express.urlencoded({ extended: true }));


app.use("/api", systemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", tasksRoutes);

export default app;