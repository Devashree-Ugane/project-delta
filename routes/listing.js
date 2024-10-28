const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressErrors = require("../utils/ExpressError.js");
const {listingSchema} = require("../scehma.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


const validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
        
        if(result.error){
            let errMsg = error.details.map((el) => el.message).join(",");
            throw new ExpressErrors(400,errMsg);
        }else{
            next();
        }
}

router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),wrapAsync(listingController.createListing));


//new route
router.get("/new" ,isLoggedIn,wrapAsync(listingController.renderNewForm));


router.route("/:id")
.get( wrapAsync(listingController.showListings))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));


//edit route
router.get("/:id/edit" ,isLoggedIn,isOwner,wrapAsync(listingController.editListing));

module.exports = router;