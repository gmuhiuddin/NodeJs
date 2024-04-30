import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js';
import db  from './config/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cookieParser());
app.use(cors());
app.use(express.json());

db.connection.once('open', () => {
    console.log("Db is connected");
})
.on('error', (error) => {
    console.log("error", error.message);
});

app.listen(port, () => {
    console.log('Server is responding');
});

app.use('/', routes);