const Router=require("express").Router();
const indexController=require("../../controllers/indexController")
const passport=require("../../config/auth")
const {Airport,Plane} =require("../../config/sequalize")
const axios =require("axios")
// in the near future ;)
//Router.get("/companies",indexController.getCompanies)



/*  
@route /api/trips/:tripId
@method get
@type public
@params tripId
@requiredData null
@desc get trip data
@return json Data {success:true,trip} or {success:false,error:"some rror"}


*/
Router.get("/trip/:tripid",indexController.getTrip);  //get one




/*  
@route /api/trips
@method get
@type public
@params null
@requiredData null
@desc get all trips 
@return json Data {success:true,trips:[]} or {success:false,error:"some rror"}


*/
Router.get("/trips",indexController.getTrips);   //get all



/*  
@route /api/airports
@method get
@type public
@params null
@requiredData null
@desc get all airports
@return json Data {success:true,airports:[]} or {success:false,error:"some rror"}


*/
Router.get("/airports",indexController.getAirports)

/*  
@route /api/airplanes
@method get
@type public
@params null
@requiredData null
@desc get airplanes list
@return json Data {success:true,airplanes:[]} or {success:false,error:"some rror"}


*/

Router.get("/airplanes",indexController.getAirplanes)



Router.get("/setup",(req,res,err)=>{

    axios.get("https://restcountries.eu/rest/v2/region/Americas").then((response)=>{
   response.data.forEach((country)=>{
        Airport.create({name:country.region+country.alpha2Code+" Air",country:country.region,state:country.name,city:country.name,zip_code:country.numericCode})
   });
})

axios.get("https://restcountries.eu/rest/v2/region/A").then((response)=>{
   response.data.forEach((country)=>{
        Airport.create({name:country.region+country.alpha2Code+" Air",country:country.region,state:country.name,city:country.name,zip_code:country.numericCode})
   });
})
let min=150;
let max=800
let planes=[
{model:"Boeing 777-300",seating_capacity:Math.random()* (max - min + 1) + min},
{model:"Airbus A340-600",seating_capacity:Math.random()* (max - min + 1) + min},
{model:"Boeing 777-200",seating_capacity:Math.random()* (max - min + 1) + min},
{model:"Airbus A350-900",seating_capacity:Math.random()* (max - min + 1) + min},
{model:"Airbus A340-500",seating_capacity:Math.random()* (max - min + 1) + min},
{model:"Airbus A340-300",seating_capacity:Math.random()* (max - min + 1) + min},
{model:"Airbus A333-300",seating_capacity:Math.random()* (max - min + 1) + min}
]
   planes.forEach((plane)=>{
        Plane.create({...plane})
   });

    res.send("DONE")
})
module.exports=Router