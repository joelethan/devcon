import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db =require('./config/keys').mongoURI;

// Use routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

// connect to DB
mongoose
    .connect(db,{ useUnifiedTopology: true },)
    .then(()=> console.log('Connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello world'),);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
