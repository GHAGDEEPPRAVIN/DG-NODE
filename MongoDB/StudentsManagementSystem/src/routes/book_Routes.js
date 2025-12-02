import express from "express";
import { addStudent, updateStudent, deleteStudent, getStudents } from "../controllers/book_Controller.js";

const router = express.Router();

router.post("/", addStudent);
router.get("/", getStudents);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;