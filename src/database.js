import Mongoose from 'mongoose'
import config from "./config";

const uri = config.MONGODB_URI
Mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('db is connected'))
.catch(err => console.error(err))