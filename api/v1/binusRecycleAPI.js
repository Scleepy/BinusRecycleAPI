const express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser");
const categoryRouter = require('./Routes/categoryRoute');
const adminRouter = require('./Routes/adminRoute');
const stationRouter = require('./Routes/stationRoute');
const dailyMissionRouter = require('./Routes/dailyMissionRoute');
const studentRouter = require('./Routes/studentRoute');
const recycleRouter = require('./Routes/recycleRoute');
const purchaseRouter = require('./Routes/purchaseRoute');
const rewardRouter = require('./Routes/rewardRoute');
const modelRoute = require('./Routes/modelRoute')

const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/station', stationRouter);
app.use('/api/v1/daily-mission', dailyMissionRouter);
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/recycle', recycleRouter);
app.use('/api/v1/purchase', purchaseRouter);
app.use('/api/v1/reward', rewardRouter);
app.use('/api/v1/model', modelRoute);

app.listen(PORT, () => {
  console.log(`API started on port ${PORT}`);
});