import { UnauthenticatedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/token.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Authentication failed");

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "6583332fac4c3abde9252a1b";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication failed");
  }
};
