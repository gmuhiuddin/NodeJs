import express from 'express';
import routes from './routes/index.mjs';
import db  from './config/db.mjs'

const app = express();

db.connection.once('open', () => {
    console.log("Db is connected");
})
.on('error', (error) => {
    console.log("error", error.message);
});

app.listen(3001, () => {
    console.log('Server is responding');
});

app.use(express.json());

app.use('/', routes);