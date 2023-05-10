const express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser");
const categoryRouter = require('./Routes/categoryRoute');
const adminRouter = require('./Routes/adminRoute');
const stationRouter = require('./Routes/stationRoute');
const dailyQuestRouter = require('./Routes/dailyQuestRoute');
const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/station', stationRouter);
app.use('/api/v1/daily-quest', dailyQuestRouter);

app.listen(PORT, () => {
  console.log(`API started on port ${PORT}`);
});