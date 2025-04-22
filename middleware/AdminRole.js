import jwt from "jsonwebtoken";
// middleware/verifyToken.js
import { prisma } from "../utils/prismaClient.js"; // Correct the path to match your file structure

// Middleware to check if user has Admin role
const checkAdminRole = async (req, res, next) => {
  try {
    // Get token from cookies or authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, access denied." });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user data from the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found, access denied." });
    }

    // Check if the user role is Admin
    if (user.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: You must be an Admin to access this dashboard.",
      });
    }

    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

export default checkAdminRole;
