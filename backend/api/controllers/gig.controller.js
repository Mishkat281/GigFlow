import createError from "../utils/createError.js";
import Gig from "../models/gig.model.js";

export const createGig = async (req, res, next) => {
  try {
    if (!req.isSeller) {
      return next(createError(403, "Only sellers can create gigs"));
    }

    const newGig = new Gig({
      userId: req.user.id,   // 🔥 attach seller id from JWT
      ...req.body
    });

    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};


export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId) {
      return next(createError(403, "You can delete only your gig"));
    }
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).json("Gig has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(createError(404, "Gig not found"));
    res.status(200).json(gig);
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }), // filter by userId if provided
    ...(q.cat && { cat: q.cat }), // filter by category if provided
    ...(q.min || // filter by price range if provided
      (q.max && { // filter by max price
        price: { ...(q.min && { $gte: q.min }), ...(q.max && { $lte: q.max }) },  // price between min and max
      })), 
    ...(q.search && { title: { $regex: q.search, $options: "i" } }), // search by title if provided
  };
  try {
    const gigs = (await Gig.find(filters)).toSorted({[q.sort]: -1}); // sort gigs based on query parameter
    res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};
