import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 1212;
app.use(cors());
app.use(express.json());

const dataFile = "./tweets.json";
let tweetsData = [];

if (fs.existsSync(dataFile)) {
    const raw = fs.readFileSync(dataFile, "utf8");
    tweetsData = raw ? JSON.parse(raw) : [];
}

const saveToFile = () => {
    fs.writeFileSync(dataFile, JSON.stringify(tweetsData, null, 2));
};

app.get("/api/tweets", (req, res) => {
    res.json(tweetsData);
});

app.get("/api/tweets/:id", (req, res) => {
    const id = Number(req.params.id);
    const tweet = tweetsData.find(t => t.id === id);
    if (!tweet) return res.status(404).json({ message: "Tweet not found" });
    res.status(200).json(tweet);
});

app.post("/api/tweets", (req, res) => {
    const { username, tweet } = req.body;
    if (!username || !username.trim() || !tweet || !tweet.trim()) {
        return res.status(400).json({ message: "Empty fields!" });
    }

    const newTweet = {
        id: Date.now(),
        username,
        tweet,
        createdAt: new Date().toLocaleString(),
        isEdit: false
    };

    tweetsData.push(newTweet);
    saveToFile();
    res.status(201).json(newTweet);
});

app.patch("/api/tweets/:id", (req, res) => {
    const id = Number(req.params.id);
    const { tweet } = req.body;
    const foundTweet = tweetsData.find(t => t.id === id);

    if (!foundTweet) return res.status(404).json({ message: "Tweet not found!" });
    if (!tweet || tweet.trim() === "") {
        return res.status(400).json({ message: "Tweet cannot be empty!" });
    }

    foundTweet.tweet = tweet;
    foundTweet.isEdit = true;
    saveToFile();
    res.json(foundTweet);
});

app.delete("/api/tweets/:id", (req, res) => {
    const id = Number(req.params.id);
    const exists = tweetsData.find(t => t.id === id);
    if (!exists) return res.status(404).json({ message: "Tweet not found" });

    tweetsData = tweetsData.filter(t => t.id !== id);
    saveToFile();
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
