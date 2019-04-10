const Router=require("express").Router();
const indexController=require("../../controllers/indexController")




Router.get("/trip/:tripid",indexController.getTrips);  //get all
Router.get("/trip",indexController.getTrip);   //get all





module.exports=Router