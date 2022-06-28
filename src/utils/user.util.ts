import { User } from '../modules/users/users.model';

export function getShortenedUsersInfo(users: User[]) {
  return users.map((user) => {
    return getShortenedUserInfo(user);
  });
}

export function getShortenedUserInfo(user: User) {
  const { email, gmail, name, id, photoUrl } = user;
  return {
    email,
    gmail,
    name,
    id,
    photoUrl,
    role: getShortenedRole(user),
  };
}

export function getShortenedRole(user: User) {
  const role = user?.role?.value;
  return role || '';
}
