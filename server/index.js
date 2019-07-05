/*const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
//const cookieSession = require('cookie-session');
const bodayParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Task');

mongoose.connect(keys.mongoURI);
const User = mongoose.model("users");
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
//v1 api routes
app.use('/docs/v1/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(bodayParser.json(), cors());

require('./routes/taskRoutes')(app);
*/
const app = require('./app')
const PORT = 5000;
app.listen(PORT);
