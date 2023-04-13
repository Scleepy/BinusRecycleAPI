const express = require('express');
const categoryRouter = require('./Routes/categoryRoute');
const PORT = process.env.PORT;

const app = express();

app.use('/api/v1/category', categoryRouter);

app.listen(PORT, () => {
  console.log(`API started on port ${PORT}`);
});