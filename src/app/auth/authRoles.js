/**
 * Authorization Roles
 */
const authRoles = {
  director: ['director'],
  manager: ['director', 'manager'],
  employee: ['director', 'manager', 'employee'],
  onlyGuest: [] 
};

export default authRoles;
