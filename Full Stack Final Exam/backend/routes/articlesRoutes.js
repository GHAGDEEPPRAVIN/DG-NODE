import express from "express";
import { creatArticle, deleteArticle, GetAllArticle, updateArticle } from "../controllers/articlesControllers.js";

const articlesRouter = express.Router()

articlesRouter.get("/",GetAllArticle)
articlesRouter.post("/",creatArticle)
articlesRouter.put("/updateArticles",updateArticle)
articlesRouter.delete("/delete/:id",deleteArticle)

export default articlesRouter;