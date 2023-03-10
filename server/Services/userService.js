import { Users } from '../models';

class UserServices {
  static getUserByEmail = async (value) => {
    try {
      const user = await Users.findOne({ where: { email: value, flag: 1 } });
      return user;
    } catch (error) {
      return error;
    }
  };

  static destroyUser = async (id) => {
    const result = await Users.destroy({ where: { id: id } });
    return result;
  };

  static registerUser = async (username, email, hashedResult, role) => {
    const result = await Users.create({
      username: username,
      password: hashedResult,
      email: email,
      role: role,
    });
    return result;
  };

  static findAllUsers = async () => {
    try {
      const users = await Users.findAll({
        attributes: ['id', 'username', 'email', 'role'],
      });
      return users;
    } catch (error) {
      throw new Error(error);
    }
  };

  static findUserByPk = async (pk) => {
    const user = await Users.findByPk(pk);
    return user;
  };
}

export { UserServices };
