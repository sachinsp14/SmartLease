var Web3 = require('web3');
var web3 = new Web3();
var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require('geocoder');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];
var smartLeaseContract = web3.eth.contract();       //Contract ABI
var smartLease = smartLeaseContract.at('');         //Address where the contract is stored

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    // Campground.findById(req.user.id, function(err, foundCampground){
    Campground.find({"user": req.user.username }, function(err, foundCampground){
       if(err)
       {
           console.log(err);
       } else
       {
            if (!err && res.statusCode == 200)
            {
                console.log(foundCampground); // Show the HTML for the Modulus homepage.
                res.render("campgrounds/index", {campgrounds: foundCampground});
            }
        }
    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){

//--------------------------------------------------------------------
    // Set the values in the blockchain
    smartLease.setDetails1(req.body.ownername, req.body.ownerethaddr, req.body.tenantname, req.body.tenantethaddr);
    smartLease.setDetails2(req.body.startdate, req.body.rent, req.body.deposit, req.body.clause);
    
//--------------------------------------------------------------------
    
    // get data from form and add to campgrounds array
    var user = req.user.username;
    var ownerName = req.body.ownername;
    var ownerEthAddr = req.body.ownerethaddr;
    var tenantName = req.body.tenantname;
    var tenantEthAddr = req.body.tenantethaddr;
    var startDate = req.body.startdate;
    var rent = req.body.rent;
    var deposit = req.body.deposit;
    var contractClause = req.body.clause;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newCampground = {user:user, ownerName: ownerName, ownerEthAddr: ownerEthAddr, tenantName: tenantName, tenantEthAddr:tenantEthAddr, address:location, lat:lat, lng:lng, startDate:startDate, rent:rent, deposit:deposit, contractClause:contractClause, author:author};
        console.log(newCampground);
        // Create a new campground and save to DB
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else {
                //redirect back to campgrounds page
                console.log(newlyCreated);
                res.redirect("/campgrounds");
            }
        });
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

module.exports = router;