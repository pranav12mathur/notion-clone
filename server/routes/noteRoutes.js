const express = require("express");
const router = express.Router();
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  toggleFavorite,
} = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect); // All note routes are protected

router.route("/").get(getNotes).post(createNote);
router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNote);
router.patch("/:id/favorite", toggleFavorite);

module.exports = router;