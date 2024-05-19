const express = require("express");
const videos = require("../VideosData.json");
const app = express();
const cors=require("cors");

app.use(cors());

app.get("/videos/all", (req, res) => {
  const title = req.query.search;
  if (!title) {
    // If no search query is provided, send back all videos
    res.json(videos.videos);
  } else {
    // If search query is provided, filter videos based on the query
    const filteredVideos = videos.videos.filter((item) => {
      return item.title.includes(title);
    });
    res.json(filteredVideos);
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

module.exports = app;
