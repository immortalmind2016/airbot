
const {Company,Airport,Trip,Plane}=require("../config/sequalize")

const getTrips=(req,res,err)=>{
   Trip.findAll({include:{all:true}}).then(
        (trips)=>{
        res.json({success:true,trips})
    })
}
const getTrip=(req,res,err)=>{
   
        Trip.findOne({where:{id:req.params.tripid},include:{all:true}}).then((data)=>{
     res.json({success:true,trip:data.dataValues}) 

        })
 

}
const getAirports=(req,res,err)=>{
    Airport.findAll().then(
        (airports)=>{
        res.json({success:true,airports})
    })
    
}
const getCompanies=(req,res,err)=>{
     Airport.findAll().then(
        (companies)=>{
        res.json({companies})
    })
}
const getAirplanes=(req,res,err)=>{
   Plane.findAll().then(
        (airplanes)=>{
        res.json({success:true,airplanes})
    })
}
module.exports={
    getTrips,
    getTrip,
    getAirports,
    getCompanies,
    getAirplanes
}