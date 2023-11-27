const mongoose = require('mongoose')
const conectionString = process.env.DATABASE

mongoose.connect(conectionString).then(()=>{
    console.log("Mongodb atlas succesfully connected blog server");
}).catch((err)=>{
    console.log(`Mongodb connection failed!!! Error ${err}`);
})