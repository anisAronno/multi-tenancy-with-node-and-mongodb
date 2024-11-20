const User = require('../models/User');

class UserService {
  // getAllUsers method
  async getAllUsers(queryParams = {}) {
    return User.search(queryParams.search, ['name', 'email'])
      .where('name', queryParams.name)
      .where('email', queryParams.email)
      .paginate(queryParams.page, queryParams.limit)
      .sort('createdAt')
      .execute();
  }

  // getUserById method
  async getUserById(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      return {
        user: {
          id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      throw new Error(`Get user by id failed: ${error.message}`);
    }
  }

  // updateUser method
  async updateUser(id, requestData) {
    try {
      const { username, email, role, name, active } = requestData;
      const user = await User.updateById(
        id,
        { username, email, role, name, active },
        { new: true }
      );
      if (!user) {
        throw new Error('User not found');
      }

      return {
        user: {
          id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      throw new Error(`Update user failed: ${error.message}`);
    }
  }

  // deleteUser method
  async deleteUser(id) {
    try {
      const user = await User.deleteById(id);
      if (!user) {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error(`Delete user failed: ${error.message}`);
    }
  }
}

module.exports = new UserService();
