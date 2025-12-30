import { UserModel , BlogModel} from "../model/blogModel.js";
import bcrypt from "bcrypt"

// code For Authentication starts...

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const BcryptPassword = await bcrypt.hash(password, 12)
        const newUser = new UserModel({
            name:name,
            email: email,
            password: BcryptPassword
        })
        const result = await newUser.save()
        res.json({ massage: "User Created Successfully..." })
    } catch (error) {
        res.status(401).json({ message: "Failed to Create user !", err: error.message });
    }
}

export const signIn = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const findUser = await UserModel.findOne({ email });
        if (!findUser) {
            return res.status(400).json({ message: "User not Found !" });
        }

        const passwordIsMatched = await bcrypt.compare(password, findUser.password);
        if (!passwordIsMatched) {
            return res.status(400).json({ message: "Password is Incorrect !" });
        }

        res.cookie("auth_token", findUser.id, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        });

        res.json({ message: "Signin Successfully !!" });

    } catch (e) {
        res.status(500).json({ message: "Signin failed", error: e.message });
    }
};

// code For Authentication ends !!!

// -------------------------------------------------------------------------------------------------------------------------------

// code For Blog CRUD starts...

export const addBlog = async (req, res) => {
  try {
    const BlogData = {
      title: req.body.title,
      content: req.body.content,
      image_path: req.file ? req.file.filename : null,
      author_reference: req.user.name 
    };

    const newBlog = await BlogModel.create(BlogData);

    res.status(201).json({
      message: "Blog added successfully",
      blog: newBlog
    });
  } catch (error) {
    res.status(500).json({ message: "Adding Blog Failed", error: error.message });
  }
};


export const getBlog = async (req, res) => {
    try {
        const blogs = await BlogModel.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Fetching Blog Failed" });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const blogData = { ...req.body };

        if (req.file) {
            blogData.image_path = req.file.filename;
        }

        const updatedBlog = await BlogModel.findByIdAndUpdate(
            req.params.id,
            blogData,
            { new: true }
        );

        res.json({ message: "Blog updated successfully", blog : updatedBlog});
    } catch (error) {
        res.status(500).json({ message: "Updating Blog Failed" });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        await BlogModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Deleting Blog Failed" });
    }
};

// code For Blog CRUD ends !!!
