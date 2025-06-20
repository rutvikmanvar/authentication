const mongoose = require('mongoose')

async function connectToMongo(url) {
    return mongoose.connect(url)
    .then(console.log('MongoDB Ccnnected successfully'))
    .catch(console.log('MongoDN Conection failed'))
}

module.exports = {
    connectToMongo
}