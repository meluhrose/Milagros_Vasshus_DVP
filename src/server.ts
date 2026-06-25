import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import articlesRoutes from "./routes/articlesRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/articles", articlesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});