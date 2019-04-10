
const  passport=require("passport")
const  db=require("../helpers/databaseFunctions");
const  {objectToArray}=require("../helpers/mappingFunctions");

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports=passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    let data=jwt_payload.payload
    let coulmns=Object.keys(data);
    let values=Object.values(data)
    
   db.insert("users",coulmns,values).then((response)=>{
    
   done(null,{email:data.email})
}).catch((response)=>{
    if(response.code=="ER_DUP_ENTRY"){
        return  done(null,{email:data.email}) 
    }
    console.log(response)
     done({errCode:response.code})
   })

}))



