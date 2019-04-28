
const {Company,Airport,Staff,Reservation,User,Trip,Plane,MessengerUser,TripStaff,staff}=require("../config/sequalize")
const {sendMessage}=require("./botController")
const config=require("../config")
var base64Img = require('base64-img');

const createTrip=(req,res,err)=>{
    let tripData=req.body.data

   Company.findOne({where:{user_id:req.user.id}}).then((company)=>{
       let date=Date.now();
  let imageFile='/uploads/';
  if(tripData.image)
  base64Img.img(tripData.image,config.path+'uploads/',date, function(err, filepath) {

let fileImage=imageFile+date+"."+filepath.split(".")[1]
delete tripData.image;
tripData={...tripData,image:fileImage}
 Trip.create({...tripData,company_id:company.id}).then((trip)=>{
       TripStaff.create({trip_id:trip.id,staff_member_id:req.body.data.staff_id})
           Airport.findOne({where:{id:tripData.arrival_Airport}}).then((airport)=>{
   MessengerUser.findAll({}).then((messengerUsers)=>{
                messengerUsers.forEach((messengerUser)=>{
                    let template={
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Fly to "+airport.city,
            "image_url":trip.image,
               "subtitle":"you can check more trip , fly now with Airbot",
            "default_action": {
              "type": "web_url",
              "url": config.url+"/trip/"+trip.id,
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":config.url,
                "title":"Airbot"
              },
               {
                "type":"postback",
                "title":"sign up",
                "payload":"SIGN_UP"
              } ,
              {
                "type":"web_url",
                "title":"Contact us",
                "url":"https://www.facebook.com"
              }              
            ]      
          }
        ]
      }
    }
  }
           
                    sendMessage(messengerUser.user_id,[template ],0)
                })
            })
           })
           
            res.json({success:true,trip})
       })

  })
  else{
 Trip.create({...tripData,company_id:company.id}).then((trip)=>{
       TripStaff.create({trip_id:trip.id,staff_member_id:req.body.data.staff_id})
           Airport.findOne({where:{id:tripData.arrival_Airport}}).then((airport)=>{
   MessengerUser.findAll({}).then((messengerUsers)=>{
                messengerUsers.forEach((messengerUser)=>{
                    let template={
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Fly to "+airport.city,
            "image_url":trip.image,
               "subtitle":"you can check more trip , fly now with Airbot",
            "default_action": {
              "type": "web_url",
              "url": config.url+"/trip/"+trip.id,
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":config.url,
                "title":"Airbot"
              },
               {
                "type":"postback",
                "title":"sign up",
                "payload":"SIGN_UP"
              } ,
              {
                "type":"web_url",
                "title":"Contact us",
                "url":"https://www.facebook.com"
              }              
            ]      
          }
        ]
      }
    }
  }
             
                    sendMessage(messengerUser.user_id,[template ],0)
                })
            })
           })
           
            res.json({success:true,trip})
       })
  }
      
   })
}
const editTrip=(req,res,err)=>{
        let tripData=req.body.data
          Company.findOne({where:{user_id:req.user.id}}).then((company)=>{

       Trip.update({...tripData},{where:{company_id:company.id,id:req.params.tripid}}).then((data)=>{
         
           if(data[0]!=0)
           Trip.findAll({where:{id:req.params.tripid}}).then(trip=>{
                res.json({success:true,trip})
           })
           else{
               res.json({error:"Not Found !"})
           }
       }).catch((err)=>{

       })
   })

}
const removeTrip=(req,res,err)=>{
    Trip.destroy({where:{id:req.params.tripid}}).then(()=>{
                    res.json({success:true})

    }).catch((err)=>{
    
                            res.json({success:false})

    })
}

const staffAdd  =(req,res,err)=>{
    let staffMemberData=req.body.data

   Company.findOne({where:{user_id:req.user.id}}).then((company)=>{

       Staff.create({...req.body.data,company_id:company.id}).then((staff)=>{
            res.json({success:true,staff:staff})
       })
   })
}
const staffEdit =(req,res,err)=>{
    let newData=req.body.data
  Company.findOne({where:{user_id:req.user.id}}).then((company)=>{
   
       Staff.update({...newData},{where:{company_id:company.id,id:req.params.id}}).then((data)=>{
     
           if(data[0]!=0)
           Staff.findAll({where:{id:req.params.id}}).then(staff=>{
                res.json({success:true,staff:staff})
           })
           else{
               res.json({error:"Not Found !"})
           }
       })
   })
}
const staffRemove =(req,res,err)=>{
      Company.findOne({where:{user_id:req.user.id}}).then((company)=>{
 
       Staff.destroy({where:{company_id:company.id,id:req.params.id}}).then((staff)=>{
          if(staff[0]!=0){
              res.json({success:true})
          }else{
               res.json({error:"Not Found !"})

          }
                
         
       })
   })
}
const staffGetAll =(req,res,err)=>{

      Company.findOne({where:{user_id:req.user.id}}).then((company)=>{

       Staff.findAll({where:{company_id:company.id}}).then((staff)=>{
            res.json({success:true,staff:staff})
       })
   })
}
const getReservations=(req,res,err)=>{
    let trips=[]
    let query={}

     if(req.user.type==1){
        Company.findOne({where:{user_id:req.user.id}}).then((company)=>{
      
            Reservation.findAll({where:{company_id:company.id},include:{all:true}}).then(reserves=>{
    
                   reserves.forEach((r,index)=>{
                Trip.findOne({where:{id:r.trip_id},include:{all:true}}).then(trip=>{
                            User.findOne({where:{id:r.user_id}}).then(user=>{
                                trips.push({trip,seat_no:r.seat_no,user:user})
                            console.log("trip************************ ",trips)
                    if(index==reserves.length-1){
                     return   res.json({success:true,trips})
                    }
                            })
                     
                })
            })
            if(reserves.length==0)

          return  res.json({success:true,trips})
            })

       
        })
    }
    else
    Reservation.findAll({where:{user_id:req.user.id},include:{all:true}}).then(reserves=>{
        if(reserves){
            reserves.forEach((r,index)=>{
                Trip.findOne({where:{id:r.trip_id},include:{all:true}}).then(trip=>{
                        User.findOne({where:{id:r.user_id}}).then(user=>{
                                  trips.push({trip,seat_no:r.seat_no,user})
    if(index==reserves.length-1){
                   return     res.json({success:true,trips})
                    }

                        })
              
                
                })
            })
        }else{
         return   res.sendStatus(404)
        }
    })
}
const planes=(req,res,err)=>{
 Plane.findAll({}).then((planes)=>{
            res.json({success:true,planes})
       })
}
const airports=(req,res,err)=>{
 Airport.findAll({}).then((Airport)=>{
            res.json({success:true,Airport})
       })
}
const getTrips=(req,res,err)=>{

      Company.findOne({where:{user_id:req.user.id}}).then((company)=>{
   
       Trip.findAll({where:{company_id:company.id},include:{all:true}}).then((trips)=>{
            res.json({success:true,trips:trips})
       })
   })
}
const staffGet =(req,res,err)=>{
    Staff.findAll({where:{company_id:company.id}}).then((staff)=>{
            res.json({success:true,staff:staff})
       })
}
module.exports={
 
    createTrip,
    removeTrip,
    editTrip,
    staffAdd,
staffEdit,
staffRemove,
staffGetAll,
getReservations,
planes,
airports,
getTrips,
staffGet

}

