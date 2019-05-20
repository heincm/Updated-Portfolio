const express = require('express');
const app  = express();
const path = require('path')
const sendMail = require('./mail')

const PORT = process.env.PORT || 8080;


//Data parsing
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "assets")));


app.post('/email', (req, res) => {
    //send email
    const {subject, email, text } = req.body
    console.log(req.body)
    sendMail(email, subject, text, function (err, data){
        if (err) {
            res.status(500).json({ message: "internal error"})
        } else {
             console.log('Email sent!')
        }
    });
    res.json({message: 'Message received!'})
})

app.get(('/'), (req, res)=> {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/:whatevs', (req, res)=> {
    let route=req.params.whatevs
    res.sendFile(path.join(__dirname, 'views', `${route}.html`));
});

app.get(('/*'), (req, res)=> {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT,  () => {
    console.log('Server is listening on Port ', PORT)
})