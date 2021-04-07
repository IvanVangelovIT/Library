if (process.NODE_ENV !== 'production') {
    require('dotenv').load()
}

const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const mongoose = require('mongoose')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
})

const db = mongoose.connection
db.on('error', err => console.log(err))
db.on('open', () => console.log('Conected to Moongose'))

app.use('/', indexRouter)


app.listen(process.env.PORT || 3000)