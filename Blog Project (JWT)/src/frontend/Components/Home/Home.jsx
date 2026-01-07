import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_path: null
  });

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth", { credentials: "include" });
      if (res.status === 401) {
        alert("Session expired. Please sign in again.");
        window.location.reload();
        return;
      }
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image_path") setFormData({ ...formData, image_path: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    if (formData.image_path) data.append("image_path", formData.image_path);

    const url = editId
      ? `http://localhost:4000/api/auth/update/${editId}`
      : "http://localhost:4000/api/auth";
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, credentials: "include", body: data });
      if (res.status === 401) { alert("Unauthorized"); return; }
      setFormData({ title: "", content: "", image_path: null });
      setEditId(null);
      fetchBlogs();
    } catch (err) { console.error("Blog submit failed"); }
  };

  const handleEdit = (blog) => {
    setEditId(blog._id);
    setFormData({ title: blog.title, content: blog.content, image_path: null });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/auth/delete/${id}`, { method: "DELETE", credentials: "include" });
      if (res.status === 401) { alert("Unauthorized"); return; }
      fetchBlogs();
    } catch (err) { console.error("Delete failed"); }
  };

  if (loading) return <h2 className="loading-text">Loading...</h2>;

  return (
    <div className="home-wrapper">
      <h2 className="home-title">{editId ? "Update Blog" : "Add New Blog"}</h2>

      <form onSubmit={handleSubmit} className="blog-form-wrapper">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="blog-input" required />
        <textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange} className="blog-textarea" required />
        <input type="file" name="image_path" onChange={handleChange} className="blog-file-input" required={!editId} />
        <button type="submit" className="blog-submit-btn">{editId ? "Update Blog" : "Add Blog"}</button>
      </form>

      <h2 className="home-title">All Blogs</h2>

      <div className="blogs-container">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            {blog.image_path && <img src={`http://localhost:4000/uploads/${blog.image_path}`} alt="blog" className="blog-img" />}
            <div className="blog-card-content">
              <h3 className="blog-card-title">{blog.title}</h3>
              <p className="blog-card-text">{blog.content}</p>
              <p className="blog-card-author">By: {blog.author_reference}</p>
              <div className="blog-card-buttons">
                <button className="edit-btn" onClick={() => handleEdit(blog)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(blog._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
