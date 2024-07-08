const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://yash0238:<password>@yash0238.bfaj6t9.mongodb.net/?retryWrites=true&w=majority&appName=Yash0238', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define Schema and Model for User
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Assuming CSS and JS files are in 'public' folder

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/register', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save()
        .then(() => {
            console.log('User registered');
            res.send('Registration successful!');
        })
        .catch(err => console.log(err));
});

// Server listening
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
