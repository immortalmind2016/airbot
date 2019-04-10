const Router=require("express").Router();

const passportJwt=require("../../config/passportJWT")
const userController=require("../../controllers/userController")

Router.get("/:id",userController.get);  //get 
Router.delete("/:id",userController.remove); //
Router.post("/edit-account",passportJwt.authenticate("jwt",{session:false}),userController.edit); //edit
Router.post("/",userController.create);  //create
Router.get("/",passportJwt.authenticate("jwt",{session:false}),userController.getCurrent); //getCurrent User



Router.get("/fav-list",userController.getFavList);  //get all
Router.get("/reservation",userController.getReservations);   //get all
Router.delete("/reservation/:tripid",userController.removeReservation); // delete
Router.post("/reservation/:tripid",userController.createReservation); // reserve



module.exports=Router