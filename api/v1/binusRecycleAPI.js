const express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser");
const categoryRouter = require('./Routes/categoryRoute');
const adminRouter = require('./Routes/adminRoute');
const stationRouter = require('./Routes/stationRoute');
const PORT = process.env.PORT;


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/station', stationRouter);


app.listen(PORT, () => {
  console.log(`API started on port ${PORT}`);
});