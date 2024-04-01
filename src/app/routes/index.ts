import { Router } from 'express';
import addressRouter from '../controllers/AddressController';
import userRouter from '../controllers/UserControlle';

const routers = Router();

routers.use('/users', userRouter);
routers.use('/address', addressRouter);

export default routers;
