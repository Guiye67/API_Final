const express = require("express");
const cors = require("cors")
const config = require("./config");
const port = config.PORT;
const app = express();
const dbConnection = require("./db/database");
const clientRoutes = require("./routes/client")
const adminRoutes = require("./routes/admin")
const classRoutes = require("./routes/class")
const dietRoutes = require("./routes/diet")
const postRoutes = require("./routes/post")
const suggestionRoutes = require("./routes/suggestion")

app.use(cors())
app.use(express.json());
app.use("/clients", clientRoutes)
app.use("/admins", adminRoutes)
app.use("/classes", classRoutes)
app.use("/diets", dietRoutes)
app.use("/posts", postRoutes)
app.use("/suggestions", suggestionRoutes)

dbConnection();

app.listen(port, () => {
    console.log(`Server launched on http://localhost:${port}`);
});