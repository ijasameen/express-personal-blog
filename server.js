import config from "dotenv/config";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import indexRouter from "./routes/root.js";

const __dirname = import.meta.dirname;

const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(expressEjsLayouts);

// Routers
app.use(indexRouter);

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`);
});
