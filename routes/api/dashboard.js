const Router=require("express").Router();
const dashboardController=require("../../controllers/dashboardController")
const passport=require("../../config/auth")

/*
Router.get("/:id",dashboardController.get);  //get 
Router.delete("/:id",dashboardController.remove); //
Router.post("/:id",dashboardController.edit); //edit
Router.post("/",dashboardController.create);  //create


*/


/*  
@route /api/trip/:tripId
@method delete
@type private
@params tripId
@requiredData null
@desc delete trip
@return json Data {success:true} or {success:false,error:"some rror"}


*/
Router.delete("/trip/:tripid",passport.authenticate("login",{session:false}),dashboardController.removeTrip); // delete


/*  
@route /api/trip/
@method post
@type private
@params null
@requiredData {...tripdata}
@desc upload trip
@return json Data {success:true,trip} or {success:false,error:"some rror"}


*/
Router.post("/trip/",passport.authenticate("login",{session:false}),dashboardController.createTrip); // create



/*  
@route /api/trip/tripid
@method post
@type private
@params null
@requiredData {...tripdata}
@desc update trip
@return json Data {success:true,trip} or {success:false,error:"some rror"}


*/
Router.post("/trip/:tripid",passport.authenticate("login",{session:false}),dashboardController.editTrip); // edit


Router.get("/trips/",passport.authenticate("login",{session:false}),dashboardController.getTrips); // edit



Router.post("/staff/add",passport.authenticate("login",{session:false}),dashboardController.staffAdd);  //add-staff-member
Router.post("/staff/edit/:id",passport.authenticate("login",{session:false}),dashboardController.staffEdit); 
Router.delete("/staff/remove/:id",passport.authenticate("login",{session:false}),dashboardController.staffRemove); 
Router.get("/staff/",passport.authenticate("login",{session:false}),dashboardController.staffGetAll); 
Router.get("/staff/:id",passport.authenticate("login",{session:false}),dashboardController.staffGet); 



/*  
@route /api/dashboard/airports
@method get
@type public
@params null
@requiredData null
@desc get all airports
@return json Data {success:true,airports} or {success:false,error:"some rror"}


*/

Router.get("/airports/",dashboardController.airports); 

/*  
@route /api/dashboard/planes
@method get
@type public
@params null
@requiredData null
@desc get all planes
@return json Data {success:true,planes} or {success:false,error:"some rror"}


*/
Router.get("/planes/",dashboardController.planes); 



Router.get("/reservations/",passport.authenticate("login",{session:false}),dashboardController.getReservations); 

module.exports=Router