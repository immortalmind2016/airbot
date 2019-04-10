
var jwt = require('jsonwebtoken');

const create=(req,res,err)=>{
    let accountData=req.body.data
    console.log(accountData)
  
    jwt.sign({payload:accountData},"secret",{ expiresIn: '365d' // expires in 365 days
},(err,token)=>{
    if(err){
      res.json(400).json({success:false,error:err})
    }
      res.json({success:true,token:"Bearer "+token})
});
}
const getCurrent=(req,res,err)=>{
    res.json({success:true,user:req.user})
}


const edit=(req,res,err)=>{
        let accountData=req.body.data

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