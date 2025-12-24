import jwt from "jsonwebtoken";

const JWT_EXPIRES_IN = process.env.NEXT_PUBLIC_JWT_EXPIRES_IN || "1h";
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "secret";

interface UserJwtPayload {
  userId: string;
}

export const createJwtToken = (payload: UserJwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as unknown as number,
  });
};

export function verifyJwt(token: string): UserJwtPayload {
  return jwt.verify(token, JWT_SECRET) as UserJwtPayload;
}
