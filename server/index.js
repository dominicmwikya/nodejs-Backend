import express from 'express';
import db from './models';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './Routes/userRouter';
import { itemsRouter } from './Routes/itemsRouter';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/items', itemsRouter);

let port;
process.env.STATUS === 'production' ?
  port = process.env.PROD_PORT :
  port = process.env.DEV_PORT;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`SERVER IS RUNNING, PORT ${port}`);
  });
});
