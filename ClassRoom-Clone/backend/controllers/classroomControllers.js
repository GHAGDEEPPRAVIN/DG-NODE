import { ClassRoomModel } from "../models/classroomModel.js";

export const getAllClassRoom = async (req, res) => {
  try {
    const data = await ClassRoomModel.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      message: "Classes fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const createClassRoom = async (req, res) => {
  try {
    const { title, joiningCode } = req.body;

    if (!title) {
      return res.json({
        status: false,
        message: "Title is required",
      });
    }

    const result = await ClassRoomModel.create({
      title,
      joiningCode,
    });

    res.json({
      status: true,
      message: "Class created successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const editClassRoom = async (req, res) => {
  try {
    const { id, title } = req.body;

    await ClassRoomModel.findByIdAndUpdate(id, {
      title,
    });

    res.json({
      status: true,
      message: "Class updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteClassRoom = async (req, res) => {
  try {
    const { id } = req.body;

    await ClassRoomModel.findByIdAndDelete(id);

    res.json({
      status: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
