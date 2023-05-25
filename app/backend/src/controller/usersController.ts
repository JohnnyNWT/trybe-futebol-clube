import { Request, Response } from 'express';
import { LoginType } from '../interfaces/IUsers';
import UsersService from '../services/usersService';

class usersController {
  private _userService: UsersService;

  constructor(userService: UsersService) {
    this._userService = userService;
  }

  async validateLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await this._userService.findUser(email, password);

    const { message, token } = result as LoginType;

    if (message.length > 0) {
      return res.status(401).json({ message });
    }
    return res.status(200).json({ token });
  }
}

export default usersController;
