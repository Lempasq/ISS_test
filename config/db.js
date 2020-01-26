const mongoose = require('mongoose'),

    // get mongoURI
      config = require('config'),
      uri = config.get('mongoURI')

// CONNECT TO DB
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    } catch(e) {
        console.log(e.message)
        // Exit process with failure
        process.exit(1)
    }
}

const connection = mongoose.connection;

connection.once('open', () => console.log("MongoDB connected"));
connection.on('error', (e) => console.log(e));

// EXPORT
module.exports = connectDB

