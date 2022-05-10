import { User } from '../modules/users/users.model';

export function getShortenedRole(users: User[]) {
  return users.map((item) => {
    const role = item?.role?.value;
    const { email, gmail, name, id } = item;
    return {
      email,
      gmail,
      name,
      id,
      role: role || '',
    };
  });
}
