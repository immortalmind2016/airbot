

 const Sequelize = require('sequelize');


const trip_staff =  {
 
     trip_id       : {
          type:Sequelize.INTEGER,
           reference:"trips",
           referenceKey:"id"
          

      },
       staff_member_id       : {
          type:Sequelize.INTEGER,
           reference:{
               model:"staff_member",
               key:"id"
           }
      
          
      }
}


 
module.exports = (sequelize, type) => {return sequelize.define("trip_staff",trip_staff)}