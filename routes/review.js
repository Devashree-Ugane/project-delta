const express = require("express");
const router = express.Router({ mergeParams : true});  //merges parent and child routes
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressErrors = require("../utils/ExpressError.js");
const {reviewSchema} = require("../scehma.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const{isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


// const validateReview = (req,res,next) => {
//     let {error} = reviewSchema.validate(req.body);
        
//         if(result.error){
//             let errMsg = error.details.map((el) => el.message).join(",");
//             throw new ExpressErrors(400,errMsg);
//         }else{
//             next();
//         }
// };

//review listing
//post route
router.post("/" ,isLoggedIn,wrapAsync(reviewController.createRreview));

//delete review route
router.delete("/:reviewId" , isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));


module.exports = router;