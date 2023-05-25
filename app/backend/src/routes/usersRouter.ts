import { Router } from 'express';
import UsersController from '../controller/usersController';
import UsersService from '../services/usersService';

const usersRouter = Router();
const usersService = new UsersService();
const usersController = new UsersController(usersService);

usersRouter.post('/', usersController.validateLogin.bind(usersController));

export default usersRouter;
