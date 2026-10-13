export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  COMPANY_ADMIN: 'COMPANY_ADMIN',
  MANAGER: 'MANAGER',
  TEAM_LEADER: 'TEAM_LEADER',
  EMPLOYEE: 'EMPLOYEE',
};

export function dashboardPathFor(role) {
  switch (role) {
    case ROLES.SUPER_ADMIN:
    case ROLES.COMPANY_ADMIN:
      return '/admin';
    case ROLES.MANAGER:
    case ROLES.TEAM_LEADER:
      return '/manager';
    default:
      return '/employee';
  }
}
