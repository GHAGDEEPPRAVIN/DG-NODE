import express from "express"
import { createClassRoom, deleteClassRoom, editClassRoom, getAllClassRoom } from "../controllers/classroomControllers.js";

const classroomRoutes = express.Router();

classroomRoutes.get("/",getAllClassRoom)
classroomRoutes.post("/createClassroom",createClassRoom)
classroomRoutes.put("/editClassroom",editClassRoom)
classroomRoutes.delete("/deleteClassroom/:id",deleteClassRoom)

export default classroomRoutes;