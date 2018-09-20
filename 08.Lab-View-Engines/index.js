const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const port = 1337;

//HOW TO USE HANDLEBARS
app.engine('.hbs', handlebars({
    extname: '.hbs',
    partialsDir: 'views/partials'
}));

app.set('view engine', '.hbs')

app.get('/', (req, res)=>{
   res.render('home', {
       title: 'Title from object'
   });
});

//HOW TO USE PUG
// app.set('view engine', 'pug');
// app.set('views', __dirname + '/views');
//
// app.get('/', (req, res) => {
//     res.render('index', {
//         title: 'Hello from express in pug file',
//         array: ['Pesho', 'Gosho', 123],
//         isValid: false
//     });
// });
//
// app.get('/cats', (req, res)=>{
//   res.render('cats/cats');
// });

app.listen(port);