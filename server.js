require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDB = require('./database/db');
const authRouter = require('./routes/auth-routes');
const homeRouter = require('./routes/home-routes');
const imageRouter = require("./routes/image-routes");
const detailsRouter = require("./routes/details-routes")
const folderRouter = require("./routes/folder-routes");

const app = express();
const port = process.env.PORT;
const appName = `friendi`;

connectToDB();

app.use(cors());
app.use(express.json());

app.use(`/${appName}`, authRouter);
app.use(`/${appName}`, homeRouter);
app.use(`/${appName}`, imageRouter);
app.use(`/${appName}`, detailsRouter);
app.use(`/${appName}`, folderRouter);

app.listen(port, () => {
    console.log(`Server is now running Port ${port}`)
});