
const express = require("express");
const cors = require("cors");
const path = require('path');

//import dbConnection
require("./db_connection/db_connection");

//to fetch data from body
const bodyParser = require("body-parser");
const user = require("./routes/user_route");
const admin = require("./routes/admin_route")
const post = require("./routes/post_route")
const ann = require("./routes/announcement_route")
const comment = require("./routes/comment_route")
const reported_post = require("./routes/reported_post_route")

const publicDir = path.join(__dirname,"files");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//runs userRoute
app.use(user)
app.use(admin)
app.use(post)
app.use(ann)
app.use(comment)
app.use(reported_post)

app.use(express.static(publicDir));

app.listen(90);
