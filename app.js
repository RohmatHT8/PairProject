const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home')
})



app.listen(port, () => console.log(`aplikasi berjalan di port ${port}`))