import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createReview, deleteReview, getReviewsByGig } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", verifyToken, createReview); // route to create a new review
router.get("/:gigId", getReviewsByGig); // route to get reviews by gigId
router.delete("/:id", verifyToken, deleteReview); // route to delete a review by id

export default router;   