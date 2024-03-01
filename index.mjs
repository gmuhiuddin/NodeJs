import express from 'express';
import routes from './routes/index.mjs';
import db  from './config/db.mjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
console.log(port);
db.connection.once('open', () => {
    console.log("Db is connected");
})
.on('error', (error) => {
    console.log("error", error.message);
});

app.listen(port, () => {
    console.log('Server is responding');
});

app.use(express.json());

app.use('/', routes);