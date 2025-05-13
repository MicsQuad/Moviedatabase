const express = require("express");
const { WatchStatus, Member, Movie } = require("../models/models");
const router = express.Router();

//add a movie to watchlist
router.post("/watchlist", async (req, res) => {
  const { memberId, movieId, status } = req.body;

  if (!memberId || !movieId || !status) {
    return res
      .status(400)
      .json({ message: "memberId, movieId, and status are required" });
  }

  if (!["watched", "to be watched"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const member = await Member.findById(memberId);
    const movie = await Movie.findById(movieId);

    if (!member || !movie) {
      return res.status(404).json({ message: "Member or Movie not found" });
    }

    // Upsert: if already added, update status
    const updated = await WatchStatus.findOneAndUpdate(
      { memberId, movieId },
      { status, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Watch status updated", data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//remove a movie from the watchlist
router.delete("/watchlist", async (req, res) => {
  const { memberId, movieId } = req.body;

  if (!memberId || !movieId) {
    return res.status(400).json({ message: "memberId, movieId are required" });
  }

  try {
    const result = await WatchStatus.findOneAndDelete({ memberId, movieId });

    if (!result) {
      return res.status(404).json({ message: "Watchlist entry not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/watchlist/:memberId", async (req, res) => {
  const { memberId } = req.params;

  try {
    const list = await WatchStatus.find({ memberId }).populate("movieId");

    res.status(200).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
