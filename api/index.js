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
app.get("/videos", (req, res) => {
  const title = req.query.title;
  if (!title) {
    // If no search query is provided, send back all videos
    res.json(videos.videos);
  } else {
    // If search query is provided, filter videos based on the query (case-insensitive)
    const filteredVideos = searchByTitle(videos.videos, title);
    res.json(filteredVideos.length > 0 ? filteredVideos : { message: "No videos found" });
  }
});

// Endpoint to get video by ID
app.get("/videos/id/:id", (req, res) => {
  const id = req.params.id;
  const video = videos.videos.find((video) => video.id === id);
  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});

// Endpoint to search videos by title (case-insensitive)
app.get("/videos/title/:title", (req, res) => {
  const title = req.params.title;
  if (!title) {
    res.status(400).json({ message: "Title parameter is missing" });
  } else {
    const filteredVideos = searchByTitle(videos.videos, title);
    res.json(filteredVideos.length > 0 ? filteredVideos : { message: "No videos found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
