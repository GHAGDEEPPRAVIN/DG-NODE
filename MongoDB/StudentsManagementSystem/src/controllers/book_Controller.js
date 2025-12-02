import Student from "../models/book_Model.js";

export const addStudent = async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json({ message: "Student added Successfully...", newStudent });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Adding Student Failed!" });
    }
};

export const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(400).json({ message: "Failed to Fetch Students!" });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const updated = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ message: "Student updated Successfully...", updated });
    } catch (error) {
        res.status(400).json({ message: "Failed to Update Student!" });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted Successfully..." });
    } catch (error) {
        res.status(400).json({ message: "Failed to Delete Student!" });
    }
};
