const express= require('express')
const app=express()
const db=require('./models')
const cors=require('cors')
const dotenv = require('dotenv');
const itemsrouter=require('./Routes/itemsRouter')
const useroutes=require('./Routes/userRouter')   
dotenv.config();

    app.use(express.json())
    app.use(cors())
    app.use('/items', itemsrouter);
    app.use('/users', useroutes);
    let port;
    process.env.STATUS==='production' ? 
        (port = process.env.PROD_PORT)
        :(port = process.env.DEV_PORT)


    db.sequelize.sync().then(()=>{
     app.listen(port,()=>{
        console.log(`SERVER IS RUNNING, PORT ${port}`)  
   });
});
