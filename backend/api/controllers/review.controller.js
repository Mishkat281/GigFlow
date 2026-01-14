import createError from "../utils/createError.js";
import Review from "../models/Review.model.js";
import gig from "../models/gig.model.js";

export const createReview = async (req, res, next) => {
  if(req.isSeller)
    return next(createError(403, "Sellers cannot create reviews"));

  const newReview = new Review({
    gigId: req.body.gigId,
    userId: req.userId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try{
    const review = await Review.findOne({ gigId: req.body.gigId, userId: req.userId });
    if(review) return next(createError(403, "You have already created a review for this gig"));

    const savedReview = await newReview.save();

    await gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { starNumber: 1, totalStars: req.body.star },
    });

    res.status(201).send(savedReview);
   }catch(err){
    next(err);
   }
};

export const deleteReview = async (req, res, next) => {
  try{

   }catch(err){
    next(err);
   }
};

export const getReviewsByGig = async (req, res, next) => {
  try{
    const reviews = await Review.find({gigId: req.params.id});
    res.status(200).send(reviews);
   }catch(err){
    next(err);
   }
};
