const Role = require('../models/Role');

class RoleController {
  // Create a new role with permissions
  static async createRole(req, res) {
    try {
      const { name, permissionIds } = req.body;

      const role = await Role.create({ name, permissions: permissionIds });
      res.status(201).json({ message: 'Role created successfully', role });
    } catch (error) {
      res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({ message: 'Error creating role', error: error.message });
    }
  }

  // Get a single role by ID (with permissions)
  static async viewRole(req, res) {
    try {
      const { id } = req.params;
      const role = await Role.with('permissions').findById(id);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      res.json(role);
    } catch (error) {
      res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({ message: 'Error fetching role', error: error.message });
    }
  }

  // List all roles (with permissions)
  static async listRoles(req, res) {
    try {
      const roles = await Role.with('permissions').paginate();
      res.status(HTTP_STATUS_CODE.OK).json({ roles: roles });
    } catch (error) {
      res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({ message: 'Error fetching roles', error: error.message });
    }
  }

  // Update a role by ID (including permissions)
  static async updateRole(req, res) {
    try {
      const { id } = req.params;
      const { name, permissionIds } = req.body;

      const role = await Role.with('permissions').updateById(id, {
        name,
        permissions: permissionIds,
      });

      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }

      res.json({ message: 'Role updated successfully', role });
    } catch (error) {
      res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({ message: 'Error updating role', error: error.message });
    }
  }

  // Delete a role by ID
  static async deleteRole(req, res) {
    try {
      const { id } = req.params;
      const role = await Role.deleteById(id);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      res.json({ message: 'Role deleted successfully' });
    } catch (error) {
      res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({ message: 'Error deleting role', error: error.message });
    }
  }
}

module.exports = RoleController;
