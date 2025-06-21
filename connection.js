const mongoose = require('mongoose')

async function connectToMongo(url) {
    return mongoose.connect(url),{
          useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,  // Force SSL
    tlsAllowInvalidCertificates: true 
    }
}

module.exports = {
    connectToMongo
}