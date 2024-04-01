import { Router } from 'express';
import addressRouter from '../controllers/AddressController';
import projectRouter from '../controllers/ProjectControlle';
import userRouter from '../controllers/UserControlle';
import userProjectRouter from '../controllers/UserProjectControlle';

const routers = Router();

routers.use('/users', userRouter);
routers.use('/address', addressRouter);
routers.use('/projects', projectRouter);
routers.use('/usersProjects', userProjectRouter);

export default routers;
