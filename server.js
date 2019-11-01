const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const db = require('./app/models');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongo_scraper';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('./app/public'));

mongoose.set('useFindAndModify', false);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connection successful');
    })
    .catch((err) => {
        console.log('Database connection error' + err);
    });

require('./app/routing/apiRoutes')(app, db);
require('./app/routing/htmlRoutes')(app, db);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
