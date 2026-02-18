import { articlesModel } from "../models/articlesModel.js"

export const creatArticle = async (req, res) => {
    const { title, content, author } = req.body;

    try {
        const result = await articlesModel.create({
            title,
            content,
            author
        })

        res.json({ status: true, message: "Article Created Successfully...", result })

    } catch (error) {
        res.json({ status: true, message: "Article Created Failed !" })
    }
}

export const GetAllArticle = async (req, res) => {
    try {
        const result = await articlesModel.find()

        res.json({ status: true, message: "Article Fetched Successfully...", result })

    } catch (error) {
        res.json({ status: true, message: "Article Fetched Failed !" })
    }
}

export const updateArticle = async (req, res) => {
    const { id, title, content, author } = req.body;
    try {
        const result = await articlesModel.FindByIdandUpdate({ id }, {
            $set: {
                title,
                content,
                author
            }
        })

        res.json({ status: true, message: "Article Updated Successfully...", result })
    } catch (error) {
        res.json({ status: true, message: "Article Update Failed !" })
    }
}

export const deleteArticle = async (req, res) => {
     const id = req.params._id;
    try {
        await articlesModel.deleteOne({ id });
        res.json({ status: true, message: "Article deleted Successfully...", result })
    } catch (error) {
        res.json({ status: true, message: "Article delete Failed !" })
    }
}