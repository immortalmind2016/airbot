const Router=require("express").Router();

const passport=require("../../config/auth")
const userController=require("../../controllers/userController")

// in the near future :) 
//Router.get("/:id",userController.get);  //get 
//Router.post("/edit-account",passport.authenticate("login",{session:false}),userController.edit); //edit
//Router.delete("/",passport.authenticate("login",{session:false}),userController.remove); //










/*  
@route /api/user/
@method Post
@type public
@params null
@requiredData 
{   email    
    phone    
    age       
    name     
    type   (0 traveller - 1 for company)   
    password
    gender   
    location
}
@desc Signup new User
@return json Data {success:true} or {success:false,error:"some rror"}


*/

Router.post("/",userController.create);  //create 



/*  
@route /api/user/
@method GET
@type Private
@params null
@requiredData null
@desc Signup new User
@return json Data {success:true,user:{id,etc...}} or {success:false,error:"some error"}

Note :required
header :{
    Authentication:token
}
*/
Router.get("/",passport.authenticate("login",{session:false}),userController.getCurrent); //getCurrent User

/*  
@route /api/user/login
@method public
@type Private
@params null
@requiredData {  email   ,password}
@desc login
@return json Data {success:true,token:"Bearer we8r75r"} or {success:false,error:"some error"}


*/
Router.post("/login",userController.login); 








/*  
@route /api/user/fav-list
@method post
@type get
@params null
@requiredData 
@desc get user fav-list
@return json Data {success:true,trips:[]} or {success:false,error:"some error"} 


*/
Router.get("/fav-list",userController.getFavList);  //get all
Router.post("/fav-list/:id",passport.authenticate("login",{session:false}),userController.addToFavList);  //get all



/*  
@route /api/user/trips
@method get
@type Private
@params null
@requiredData 
@desc get user reservasions ( trips )
@return json Data {success:true,trips:[]} or {success:false,error:"some error"} 


*/
Router.get("/trips",userController.getReservations);   //get all

/*  
@route /api/user/reservation/:tripId
@method delete
@type Private
@params tripId
@requiredData 
@desc delete user reservation
@return json Data {success:true} or {success:false,error:"some error"} 


*/

Router.delete("/reservation/:id",passport.authenticate("login",{session:false}),userController.removeReservation); // delete


/*  
@route /api/user/reservation/:tripId
@method post
@type Private
@params tripId
@requiredData 
@desc  reserve new trip
@return json Data {success:true} or {success:false,error:"some error"} 


*/

Router.post("/reservation/:tripid",passport.authenticate("login",{session:false}),userController.createReservation); // reserve



module.exports=Router