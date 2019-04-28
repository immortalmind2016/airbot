
const  passport=require("passport")
const  db=require("../helpers/databaseFunctions");
const  {objectToArray}=require("../helpers/mappingFunctions");
const {User,Company}=require("../config/sequalize")
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy=require("passport-local").Strategy;

var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use("signup",new LocalStrategy(opts, function(jwt_payload, done) {
    let data=jwt_payload 
    
  
}))




passport.use("login",new JwtStrategy(opts, function(jwt_payload, done) {

    let data=jwt_payload

        User.findOne({where:{email:data.email,password:data.password}}).then((user)=>{
         done(null,{...user.dataValues})
    }).catch((err)=>{
      
          done({err:"not found"})
         })


}))

module.exports=passport