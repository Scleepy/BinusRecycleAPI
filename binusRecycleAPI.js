const express = require('express');
require('dotenv').config();
const sql = require('./databaseConnection');

const app = express();

app.get('/category', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM MsCategory');
        console.log('Request Received /category');
        res.send(result.recordset);
    }catch(err){
        console.log('Error querying database', err);
        res.status(500).send('Error querying database');
    }
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});