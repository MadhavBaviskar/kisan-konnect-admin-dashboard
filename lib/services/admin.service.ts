import pool from "../db";
import bcrypt from "bcryptjs";

export async function getAdminByEmail(email: string) {
  const [rows]: any = await pool.query(
    "SELECT * FROM admins WHERE email = ?",
    [email]
  );
  return rows[0];
}

export async function verifyAdminPassword(
  plainPassword: string,
  passwordHash: string
) {
  return bcrypt.compare(plainPassword, passwordHash);
}
