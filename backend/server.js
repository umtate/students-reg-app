const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(require("./routes/students"));

app.listen(process.env.PORT || 3000);
