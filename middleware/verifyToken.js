import jwt from "jsonwebtoken";
import { prisma } from "../utils/prismaClient.js"; // Adjust path as necessary

// Middleware to verify token and role
const verifyRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const token =
        req.cookies.token || req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ message: "No token provided, access denied." });
      }

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        return res
          .status(401)
          .json({ message: "User not found, access denied." });
      }

      if (user.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient role" });
      }
      req.user = user;
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  };
};
export default verifyRole;
