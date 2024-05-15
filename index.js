const express = require("express");
const app = express();
require("dotenv").config();
const {PORT} = process.env
const { dbConnection } = require("./config/config")
const { handleTypeError }= require('./middleware/errors');


dbConnection()

app.use(express.json())

app.use('/users', require('./routes/users'))
app.use('/comments', require('./routes/comments'))
app.use('/posts', require('./routes/posts'))

app.use(handleTypeError)

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));