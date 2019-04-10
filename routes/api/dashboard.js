const Router=require("express").Router();
const userController=require("../../controllers/userController")

Router.get("/:id",userController.get);  //get 
Router.delete("/:id",userController.remove); //
Router.post("/:id",userController.edit); //edit
Router.post("/",userController.create);  //create





Router.delete("/trip/:tripid",userController.removeReservation); // delete
Router.post("/trip/",userController.createReservation); // reserve
Router.post("/trip/:tripid",userController.createReservation); // edit








module.exports=Router