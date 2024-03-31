import { Router } from 'express';
import userRouter from '../controllers/UserControlle';

const routers = Router();

routers.use('/users', userRouter);

export default routers;
