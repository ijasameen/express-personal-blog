import config from "dotenv/config";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";

import connectDatabase from "./config/dbConnection.js";
import indexRouter from "./routes/root.js";
import adminRouter from "./routes/admin.js";
import configureSession from "./config/sessionConfig.js";

const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(expressEjsLayouts);
app.set("layout", "layouts/layout");
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
// Note: By default, express uses views as the default directory for templates.
// app.set("views", __dirname + "/views");

// This function will configure the express-session middleware.
app.use(configureSession());

// Routers
app.use(indexRouter);
app.use("/admin", adminRouter);

// Handling 404
app.use((req, res) => {
  res.status(404);
  res.render("404", { title: "Blog Website - 404" });
});

await connectDatabase();
app.listen(PORT, async () => {
  console.log(`Server running at port:${PORT}`);
});
