if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: "../.env" });
}
const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

main().then((res)=>{
    console.log("Database connected successfuly!");
}).catch(()=>{
    console.log("Failed to connect DB");
})

 async function main(){
    await mongoose.connect(process.env.MONGO_URL);    
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = await initData.data.map((obj)=>({...obj, owner : '69a13e5aba4235c26e6d5656'}))
    await Listing.insertMany(initData.data);
    console.log("Data added successfully");
}

initDB();