const config = require('../config/config');
const mongoose = require('mongoose');
mongoose.connect(config.mongoUrl, {useNewUrlParser: true, 
                                                useUnifiedTopology: true
                                            });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we are connected");
});

module.exports = db;