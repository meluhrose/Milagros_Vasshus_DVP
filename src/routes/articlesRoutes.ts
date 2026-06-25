import { Router } from "express";
import { getArticles, createArticle } from "../controllers/articlesControllers";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getArticles);
router.post("/", authenticateToken, createArticle);

export default router;