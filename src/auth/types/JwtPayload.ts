export type JwtPayload = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatarUrl: string | null;
  createdAt: Date;
};
