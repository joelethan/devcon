import express from 'express';
import mongoose from 'mongoose';

const app = express();

// DB config
const db =require('./config/keys').mongoURI

// connect to DB
mongoose
    .connect(db,{ useUnifiedTopology: true },)
    .then(()=> console.log('Connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello world'),);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
