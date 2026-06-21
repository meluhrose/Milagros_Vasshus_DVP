import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../db/connection";
import jwt from "jsonwebtoken";

type User = RowDataPacket & {
    id: number;
    email: string;
    password_hash: string;
}

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    const [existingUsers] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute<ResultSetHeader>(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, hashedPassword]
    );

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required",
            });
        }

        // Fetch user from database
        const [users] = await pool.query<User[]>(
            "SELECT id, email, password_hash FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }

        const user = users[0];
        if (!user) {
          return res.status(401).json({
            error: "Invalid email or password",
          });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
        });

        return res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error("login/register error:", error);

        return res.status(500).json({
            error: "Internal server error",
            details: error instanceof Error ? error.message : String(error),
        });
    }
};
