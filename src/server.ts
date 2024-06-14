import express from 'express';
import morgan from 'morgan';
import path from 'path';

const app = express();
require("./database");


// Settings
app.set('PORT', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');

// Middlewares
app.use(morgan('short'));
app.use(express.urlencoded({extended: false}));
express.json();

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/login'));
app.use(require('./routes/register'));

// Application port is setted, then it shows message
app.listen(app.get('PORT'), () => {
    console.log(`Server running on port ${app.get('PORT')}`)
});