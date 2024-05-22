const express = require("express");
const videos = require("../VideosData.json");
const app = express();
const cors = require("cors");

app.use(cors());

// Helper function to search by title case-insensitively
const searchByTitle = (videos, title) => {
  return videos.filter((video) => video.title.toLowerCase().includes(title.toLowerCase()));
};

// Endpoint to get all videos or search by title (case-insensitive)
app.get("/videos/all", (req, res) => {
  const title = req.query.search;
  if (!title) {
    // If no search query is provided, send back all videos
    res.json(videos.videos);
  } else {
    // If search query is provided, filter videos based on the query (case-insensitive)
    const filteredVideos = searchByTitle(videos.videos, title);
    res.json(filteredVideos);
  }
});


// Endpoint to search videos by title (case-insensitive)
app.get("/videos/search/:title", (req, res) => {
  const title = req.params.title;
  const filteredVideos = searchByTitle(videos.videos, title);
  res.json(filteredVideos);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});



// Endpoint to get video by ID
app.get("/videos/:id", (req, res) => {
  const id = req.params.id;
  const video = videos.videos.find((video) => video.id === id);
  if (video) {
    res.json(video);
  } else {
    res.status(404).send("Video not found");
  }
});



module.exports = app;
