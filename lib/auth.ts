import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function verifyAdminToken(authHeader: string | null) {
  if (!authHeader) {
    throw new Error("Missing Authorization header");
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new Error("Invalid Authorization format");
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}
