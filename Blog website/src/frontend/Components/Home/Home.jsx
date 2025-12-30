import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_path: null
  });

  const [editId, setEditId] = useState(null);

  // FETCH BLOGS Function
  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:1000/api/blog", {
      credentials: "include"
    });
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle INPUT Function
  const handleChange = (e) => {
    if (e.target.name === "image_path") {
      setFormData({ ...formData, image_path: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle CREATE & UPDATE Function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    const url = editId
      ? `http://localhost:1000/api/blog/update/${editId}`
      : "http://localhost:1000/api/blog/add";

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      credentials: "include",
      body: data
    });

    setFormData({
      title: "",
      content: "",
      author_reference: "",
      image_path: null
    });
    setEditId(null);

    fetchBlogs();
  };

  // Handle Edit Function
  const handleEdit = (blog) => {
    setEditId(blog._id);
    setFormData({
      title: blog.title,
      content: blog.content,
      author_reference: blog.author_reference,
      image_path: null
    });
  };

  // Handle Delete Function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    await fetch(`http://localhost:1000/api/blog/delete/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    fetchBlogs();
  };

  return (
    <div className="home-container">
      <h2>{editId ? "Update Blog" : "Add Blog"}</h2>

      <form onSubmit={handleSubmit} className="blog-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="image_path"
          onChange={handleChange}
          required={!editId}
        />

        <button>{editId ? "Update Blog" : "Add Blog"}</button>
      </form>

      <h2>All Blogs</h2>

      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            <h3>{blog.title}</h3>
           <div style={{display:"flex", alignContent:"center",justifyContent:"space-between"}}>
            {blog.image_path && (
              <img
                src={`http://localhost:1000/uploads/${blog.image_path}`}
                alt="blog"
              />
            )}
             <p>{blog.content}</p>
           </div>

            <p><strong>Author:</strong> {blog.author_reference}</p>

            <div className="btn-group">
              <button onClick={() => handleEdit(blog)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(blog._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
