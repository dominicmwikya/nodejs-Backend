import { Users } from '../models';
import { AuthMiddleware } from '../Middleware/AuthMiddleware';
import { Validator } from '../Middleware/Validator';
import { UserServices } from '../Services/userService';

class UserController {
  static createUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      const user = await UserServices.getUserByEmail(email);
      if (user) {

        return res.status(400).json({ error: email + ' already in use' });

      } else {

        const hashedResult = await Validator.hashPassword(password);
        const result = await UserServices.registerUser(username, email, hashedResult, role);

        if (result) {

         return res.status(200).send('User created successfully');

        } else {
          return res.status(400).json({ erorr: 'Error creating user' });
        }
      }
    } catch (error) {
        return res.status(400).json({error:error});
    }
  };

  static getUsers = async (req, res) => {
    try {
      const users = await UserServices.findAllUsers();
      res.send(users);
    } catch (error) {
       return res.status(400).json({ error: error });
    }
  };

  static updateUser = async (req, res) => {
    const { username, email } = req.body;
    const user_id = req.params.id;
    const ustatus = await Users.update({ username: username, email: email }, { where: { id: user_id } });
    if (ustatus) {
      res.status(200).send('records for user id ' + user_id + ' updated successfully');
    }
  };

  static deleteUser = async (req, res) => {
    const id = await req.params.id;
    try {
      const record = await UserServices.findUserByPk(id);
      if (record) {
        const response = await UserServices.destroyUser(id);
        if (response) {
          res.send('User with id ' + id + ' deleted successfully');
        }
      } else {
        res.json({ error: 'User with ' + id + ' Already Deleted!' });
      }
    } catch (error) {
      res.json({ error: error });
    }
  };

  static login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await UserServices.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ error: 'Invalid Username or password' });
      } else {
        const isValidPassword = await Validator.comparePassword(password, user.password);
        if (!isValidPassword) {
          res.status(400).json({ error: 'Invalid Username or password' });
        } else {
          const tokenObject = AuthMiddleware.generateToken(user);
          return res.json({ secretKey: tokenObject.token, user: tokenObject.user });
        }
      }
    } catch (error) {
      next(error);
    }
  };

  static async auth(req, res) {
    const id = req.userId;
    try {
      const user = await UserServices.findUserByPk(id);
      if (!user) {
        throw new Error('Invalid user!');
      }
      res.json(user);
    } catch (error) {
      res.status(401).json({ error: error });
    }
  }
}

export { UserController };
