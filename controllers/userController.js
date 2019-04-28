
var jwt = require('jsonwebtoken');
const  db=require("../helpers/databaseFunctions");
var base64Img = require('base64-img');
const config=require("../config")

const {User,Company,Reservation,Trip,FavList,MessengerUser}=require("../config/sequalize")
const {sendMessage}=require("./botController")
const create=(req,res,err)=>{
    
   let data=req.body.data
   User.create(data).then((user)=>{
        if(data.type==1){
            MessengerUser.findAll({}).then((messengerUsers)=>{
                messengerUsers.forEach((messengerUser)=>{
                    sendMessage(messengerUser.user_id,[{text:"New Company was Added @"+data.company_name},
                      {"attachment":{
      "type":"image", 
      "payload":{
        "url":config.url+"/"+data.logo_url, 
        "is_reusable":true
      }
    }
  }
                    ],0)
                })
            })
  let date=Date.now();
  let imageFile='/uploads/';

if(data.logo_url)
base64Img.img(data.logo_url,config.path+'uploads/',date, function(err, filepath) {
let fileImage=imageFile+date+"."+filepath.split(".")[1]
delete data.logo_url;
console.log(data ,"PATH ",filepath)
data={...data,logo_url:fileImage}
console.log(data)
  Company.create({...data,user_id:user.id}).then((company)=>{
            return   res.json({success:true,user:user.dataValues})

        })
        
})
else
            Company.create({...data,user_id:user.id}).then((company)=>{
            return   res.json({success:true,user:user.dataValues})

        })
           
        }else
            res.json({success:true,user:user.dataValues})
      
    }).catch((err)=>{
      
        try{
   if(err.parent.code=="ER_DUP_ENTRY"){

  
      res.json({success:false,error:"email address already used"})
    }else{
        res.json({success:true,error:"try again later !"})
    }
        }catch(e){

        }
     


    })
}
const getCurrent=(req,res,err)=>{

    if(req.user.type==1){
        Company.findOne({where:{user_id:req.user.id}}).then((data)=>{
     res.json({success:true,user:{...req.user,...data.dataValues}}) 

        })
    }else
     res.json({success:true,user:req.user}) 



}


const edit=(req,res,err)=>{
        let accountData=req.body.data;
 
        User.update({...accountData},{where:{id:req.user.id}}).then(
            
            (data)=>{

                User.findOne({where:{id:req.user.id}}).then(user=>{
             
   res.json({success:true,user:user})
                })
            
        })
        

}
const remove=(req,res,err)=>{
    let id=req.user.id;

    User.destroy({where:{id}}).then((result)=>{
        return res.json({success:true})
    }).catch((error)=>{

        res.sendStatus(500)
    })
}
const get=(req,res,err)=>{
      let id=req.params.id


    User.findOne({where:{ id:parseInt(id) }}).then((result)=>{


        if(result){
    /*delete result.dataValues.password
     delete result.dataValues["passowrd"];
     delete result.dataValues["id"]*/
        return res.json({success:true,user:result.dataValues})
        }
   
        else{
                res.sendStatus(404)
        }
    }).catch((error)=>{
 
        res.sendStatus(500)
    })
}
const login=(req,res,err)=>{


    User.findOne({where:{ email:req.body.data.email,password:req.body.data.password }}).then((result)=>{


        if(result){
             jwt.sign(req.body.data,"secret",(err,token)=>{
       return res.json({success:true,token:"Bearer "+token})
                 })
       

        }else
        res.json({success:false,error:"not found !"})
    }).catch((error)=>{

        res.sendStatus(500)
    })
   
}
const getAll=(req,res,err)=>{
    
}
const getFavList=(req,res,err)=>{
       let trips=[]
    FavList.findAll({where:{user_id:req.user.id}}).then(reserves=>{
        if(reserves){
            reserves.forEach((r,index)=>{
                Trip.findOne({where:{id:r.trip_id}}).then(trip=>{
                    trips.push(trip)
                    if(index==reserves.length-1){
                        res.json({success:true,trips})
                    }
                })
            })
        }else{
            res.sendStatus(404)
        }
    })
}
const createFav=(req,res,err)=>{
    let data=req.body.data
    FavList.create({...data,user_id:req.user.id}).then(()=>{
        res.sendStatus(200)
    }).catch(()=>{
        res.sendStatus(500)
    })
}

const getReservations=(req,res,err)=>{
    let trips=[]
    let query={}
     if(req.user.type==0){
        Company.findOne({where:{user_id:req.user.id}}).then((company)=>{
            Reservation.findAll({where:{user_id:req.user.id},include:{all:true}}).then(reserves=>{
                    let trips=reserves.filter((rese)=>(
                        rese.tripA.company_id==company.id
                    ))

  res.json({success:true,trips})
            })

       
        })
    }
    else
    Reservation.findAll({where:{user_id:req.user.id}}).then(reserves=>{
        if(reserves){
            reserves.forEach((r,index)=>{
                Trip.findOne({where:{id:r.trip_id}}).then(trip=>{
                    trips.push(trip)
                    if(index==reserves.length-1){
                        res.json({success:true,trips})
                    }
                })
            })
        }else{
            res.sendStatus(404)
        }
    })
}
const createReservation=(req,res,err)=>{
    let data=req.body.data 
    // trip_id 
    // user_id
    // set_number
 Reservation.create({...data,trip_id:req.params.tripid,user_id:req.user.id}).then(reserve=>{
     res.sendStatus(200)
 }).catch(err=>{
     res.json({error:err})
 })
}
const removeReservation=(req,res,err)=>{
    Reservation.destroy({where:{id:req.params.id}}).then(()=>{
        res.sendStatus(200)
    }).catch(()=>{
        res.sendStatus(500)
    })
}
const addToFavList=(req,res,err)=>{
    FavList.create({user_id:req.user.id,trip_id:req.params.id}).then(()=>{
        res.sendStatus(200)
    }).catch(()=>{
        res.sendStatus(500)
    })
}
module.exports={
    create,
    edit,
    remove,
    get,
    getFavList,
    createFav,
    getReservations,
    createReservation,
    removeReservation,
    getCurrent,
    login,
    addToFavList
    

}