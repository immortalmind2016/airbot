

 const Sequelize = require('sequelize');


const reservation =  {
 
     trip_id       : {
          type:Sequelize.INTEGER,
           reference:"trips",
           referenceKey:"id",
              unique:"compositeIndex"

          

      },
    seat_no         : Sequelize.INTEGER ,
    user_id       : {
          type:Sequelize.INTEGER,
           reference:"users",
           referenceKey:"id",
           unique:"compositeIndex"

          

      },
      company_id:{
              type:Sequelize.INTEGER,
           reference:"users",
           referenceKey:"id",
           unique:"compositeIndex"
      }

}


 
module.exports = (sequelize, type) => {return sequelize.define("reservation",reservation)}