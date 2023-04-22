const express = require('express');
const bodyParser = require("body-parser");
const categoryRouter = require('./Routes/categoryRoute');
const adminRouter = require('./Routes/adminRoute');
const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());

app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/admin', adminRouter);


app.listen(PORT, () => {
  console.log(`API started on port ${PORT}`);
});