import express from "express"
import cors from "cors"

const app = express()
const port = 1212;
app.use(cors());
app.use(express.json());

let tweetsData = [
    {
        id: 1,
        username: "Amrit Pal",
        tweet: "I am an Front-End Developer",
        createdAt: "17/01/2025",
        isEdit: false
    },
    {
        id: 2,
        username: "Amrit Pal Singh",
        tweet: "I am an Back-End Developer",
        createdAt: "16/05/2025",
        isEdit: false
    }
]

app.get("/api/tweets", (req, res) => {
    res.json(tweetsData)
})

app.get("/api/tweets/:id", (req, res) => {
    const id = Number(req.params.id);
    const tweet = tweetsData.find(t => t.id === id);

    if (!tweet) {
        return res.status(404).json({ message: "Tweet not found" });
    }

    res.status(200).json(tweet);
});

app.post("/api/tweets", (req, res) => {
    const { username, tweet } = req.body;

    if (!username || username.toString().trim() === "" || !tweet || tweet.toString().trim() === "") {
        return res.status(400).json({ message: "Empty fields!" });
    }

    const newTweet = {
        id: Date.now(),
        username: username,
        tweet: tweet,
        createdAt: new Date().toLocaleString(),
        isEdit: false
    }

    tweetsData.push(newTweet)
    res.status(201).json(newTweet)
})

app.patch("/api/tweets/:id",(req,res)=>{
    const id = Number(req.params.id);
    const {tweet} = req.body;

    const tweets = tweetsData.find((t) => t.id === id);
    if (!tweets) return res.status(404).json({ message: "Tweet not found !" });

    if (!tweet || tweet.trim() === "") {
        return res.status(400).json({ message: "Tweet cannot be empty!" });
    }

    tweets.tweet = tweet;
    tweets.isEdit = true;
    res.json(tweets);
})

app.delete("/api/tweets/:id", (req, res) => {
    const id = Number(req.params.id);
    const exists = tweetsData.find((t) => t.id === id);

    if (!exists) return res.status(404).json({ message: "Tweet not found" });

    tweetsData = tweetsData.filter((t) => t.id !== id);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server Started localhost:${port} successfully !!`)
})
