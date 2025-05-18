import config from "dotenv/config";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";

import indexRouter from "./routes/root.js";
import adminRouter from "./routes/admin.js";
import dbConnection from "./config/dbConnection.js";

const __dirname = import.meta.dirname;
const PORT = process.env.PORT || 9000;

const app = express();

await dbConnection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(expressEjsLayouts);
app.set("layout", "layouts/layout");
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
// Note: By default, express uses views as the default directory for templates.
// app.set("views", __dirname + "/views");

// Routers
app.use(indexRouter);

app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`);
});
