const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1337;

//The right way for routers
const homeRouter = require('./controllers/home');

//middleware function
const authentication = (req, res, next) => {
    console.log('Is authenticated?');
    next();
};

//middleware that is called for every method
// app.use((req, res, next) => {
//    console.log('Im called everytime');
//    next();
// });

//middleware from library that can be userd for parsing forms
app.use(bodyParser.urlencoded({extended: true}));

//everything becomes public and can be accessed
app.use(express.static('./content'));

//WE CAN DO IT LIKE THIS
// app.get('/', authentication, (req, res) => {
//     res.send('Hello from express!');
// });

// app.post('/', (req, res) => {
//     res.send('Post method on tha "/" path')
// });


//OR WE CAN DO IT WITH CHAINING LIKE THIS
app.route('/')
    .get((req, res) => {
        res.send('Hello from express!');
    })
    .post((req, res) => {
        res.send('Post method on tha "/" path')
    });

app.get('/about', authentication, (req, res) => {
    res.send('About page');
});

//the browser download the file
app.get('/download', (req, res) => {
    res.download('./index.js');
    res.redirect('/about');
});

//the browser visualise the file if the browser does not understand the type of the file it can download it
app.get('/sendFile', (req, res) => {
    res.sendFile(__dirname + '/index.js');
});

app.get('/courses/:id/:title/:date', (req, res) => {
    const params = req.params;
    console.log(params);
    console.log(params.id)
});

//the right way for routers

app.use('/home', homeRouter);

app.post('/save-form', (req, res)=>{
   console.log(req.body);
   console.log(req.body.username);
   console.log(req.body.password);
   res.redirect('/');
});

app.listen(port, () => {
    console.log('Server is running..')
});