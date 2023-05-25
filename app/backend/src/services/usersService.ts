import bcrypt = require('bcryptjs');
import generateToken from '../utils/generateToken';
import { LoginType } from '../interfaces/IUsers';
import Users from '../database/models/users';

class usersService {
  private _usersModel: typeof Users;

  constructor() {
    this._usersModel = Users;
  }

  async findUser(email: string, password: string): Promise<LoginType> {
    const userEmail = await this._usersModel.findOne({ where: { email } });

    const verifyPassword = await bcrypt.compare(password, userEmail?.dataValues.password);

    if (!verifyPassword) {
      return { message: 'Invalid email or password', token: '' };
    }

    const token = await generateToken(userEmail?.dataValues);

    return { message: '', token };
  }
}

export default usersService;
