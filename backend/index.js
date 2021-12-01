const connectToMongo = require('./db')
const path = require('path')
const express = require('express')
var cors = require('cors')
connectToMongo();
const app = express()
const port = 3001


app.use(cors())
////Available  Routes
app.use(express.json())
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNoteBook listening at http://localhost:${port}`)
}) 