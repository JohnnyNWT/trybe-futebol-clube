import { Router } from 'express';
import UsersController from '../controller/usersController';
import UsersService from '../services/usersService';
import validateToken from '../middlewares/validateToken';

const usersRouter = Router();
const usersService = new UsersService();
const usersController = new UsersController(usersService);

usersRouter.post('/', usersController.validateLogin.bind(usersController));
usersRouter.get('/', validateToken.verifyToken, usersController.role.bind(usersController));

export default usersRouter;
