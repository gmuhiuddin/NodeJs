import express from 'express';
import routes from './routes/index.js';
import db  from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

db.connection.once('open', () => {
    console.log("Db is connected");
})
.on('error', (error) => {
    console.log("error", error.message);
});

app.use(cors());

app.listen(port, () => {
    console.log('Server is responding');
});

app.use(express.json());

app.use('/', routes);