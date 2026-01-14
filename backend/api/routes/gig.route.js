import express from "express";
import {createGig, deleteGig, getGig, getGigs} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createGig); // route to create a new gig
router.delete("/:id", verifyToken, deleteGig); // route to delete a gig by id
router.get("/single/:id", getGig); // route to get a single gig by id
router.get("/", getGigs); // route to get multiple gigs based on query parameters

export default router;   