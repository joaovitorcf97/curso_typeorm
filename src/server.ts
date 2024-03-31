import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import routers from './app/routes';
import { AppDataSource } from './database/dataSource';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routers);

AppDataSource.initialize().then(async () => {
  console.log(`🗂️ Database started!`);
  app.listen(process.env.PORT || 3333, () => {
    console.log(`🚀 Server started on port ${process.env.PORT || 3333}!`);
  });
});
