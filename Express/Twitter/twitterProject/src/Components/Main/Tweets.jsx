import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTweet, deleteTweet, updateTweet, setTweets } from "./../../features/tweetsSlice";
import "./Tweets.css";

const url = "http://localhost:1212/api/tweets";

const Tweets = () => {
  const [tweet, setTweet] = useState("");
  const [username, setUsername] = useState("");
  const [editId, setEditId] = useState(null);

  const tweets = useSelector((state) => state.tweets);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTweets = async () => {
      const res = await fetch(url);
      const data = await res.json();
      dispatch(setTweets(data));
    };
    loadTweets();
  }, [dispatch]);

  const handleAdd = useCallback(async () => {
    if (!tweet.trim() || !username.trim()) return;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, tweet }),
    });

    const newTweet = await res.json();
    dispatch(addTweet(newTweet));

    setTweet("");
    setUsername("");
  }, [tweet, username, dispatch]);

  const handleUpdate = async () => {
    if (!tweet.trim()) return;

    const res = await fetch(`${url}/${editId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tweet, isEdit: true }),
    });

    const updatedTweet = await res.json();
    dispatch(updateTweet(updatedTweet));

    setEditId(null);
    setTweet("");
    setUsername("");
  };

  const startEdit = (t) => {
    setTweet(t.tweet);
    setUsername(t.username);
    setEditId(t.id);
  };

  const handleDelete = async (id) => {
    await fetch(`${url}/${id}`, { method: "DELETE" });
    dispatch(deleteTweet(id));
  };

  return (
    <div>
      <div className="head">
        <h1>Home</h1>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={editId !== null}
        />

        <textarea
          placeholder="Enter your tweet"
          value={tweet}
          onChange={(e) => setTweet(e.target.value.slice(0, 280))}
          maxLength={280}
        />

        <div className="charCount">{tweet.length}/280</div>

        {editId ? (
          <button onClick={handleUpdate} style={{ background: "#f39c12" }}>
            Update
          </button>
        ) : (
          <button onClick={handleAdd}>Upload</button>
        )}
      </div>

      <div className="tweetListContainer">
        <table className="tweetList">
          <tbody>
            {tweets.map((t) => (
              <tr key={t.id}>
               
                <td className="tweetUsername">
                  {t.username}
                  {t.isEdit && <span className="editedBadge"> • Edited</span>}
                </td>

               
                <td className="tweetMsg">{t.tweet}</td>

                
                <td className="editDeleteTd">
                  <span className="tweetTime">{t.createdAt}</span>

                  <button className="editBtn" onClick={() => startEdit(t)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>

                  <button className="deleteBtn" onClick={() => handleDelete(t.id)}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Tweets;
