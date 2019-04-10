
var jwt = require('jsonwebtoken');
const  db=require("../helpers/databaseFunctions");
const Sequelize = require('sequelize');
const sequelize = new Sequelize('airbot', 'root', '', {
  host: 'localhost',
  dialect:"mysql"/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const create=(req,res,err)=>{
    let accountData=req.body.data

  
    jwt.sign({payload:accountData},"secret",{ expiresIn: '365d' // expires in 365 days
},(err,token)=>{
    if(err){
      res.json(400).json({success:false,error:err})
    }
      res.json({success:true,token:"Bearer "+token})
});
}
const getCurrent=(req,res,err)=>{
    db.select("*","users","email="+req.user.email).then(data=>{
   res.json({success:true,user:data})
    }).catch((error)=>{
            console.log(error)
    })
 
}


const edit=(req,res,err)=>{
        let accountData=req.body.data;
        db.update("users",accountData,"email="+req.user.email).then(data=>{
        res.json({success:true,user:data})
            }).catch((error)=>{
                    console.log(error)
            })

}
const remove=(req,res,err)=>{
    
}
const get=(req,res,err)=>{
    
}
const getAll=(req,res,err)=>{
    
}
const getFavList=(req,res,err)=>{

}

const getReservations=(req,res,err)=>{

}
const createReservation=(req,res,err)=>{

}
const removeReservation=(req,res,err)=>{

}
module.exports={
    create,
    edit,
    remove,
    get,
    getFavList,
    getReservations,
    createReservation,
    removeReservation,
    getCurrent,

}