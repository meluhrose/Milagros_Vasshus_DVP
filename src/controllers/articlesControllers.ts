import { Request, Response, NextFunction } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../db/connection";


export const getArticles = async (
    req: Request,
    res: Response,
) => {
    try {
        const [articles] = await pool.query<RowDataPacket[]>(
    "SELECT id, title, body, category, submitted_by, created_at FROM articles"
);
        return res.status(200).json(articles);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to retrieve articles",
        });
    }
};

export const createArticle = async (
    req: Request,
    res: Response
) => {
    try {
        const { title, body, category } = req.body;

        if (!title || !body || !category) {
            return res.status(400).json({
                error: "Title, body, and category are required",
            });
        }

        const user = (req as any).user;

        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        await pool.execute<ResultSetHeader>(
    `INSERT INTO articles
    (title, body, category, submitted_by)
    VALUES (?, ?, ?, ?)`,
    [title, body, category, user.id]
);

        return res.status(201).json({
            message: "Article created successfully",
        });
    } catch (error) {
    console.error("Create article error:", error);

    return res.status(500).json({
        error: "Failed to create article",
        details: error instanceof Error ? error.message : String(error),
    });
}
};