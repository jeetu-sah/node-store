const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node_practice', {useNewUrlParser: true, 
                                                useUnifiedTopology: true
                                            });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we are connected");
});