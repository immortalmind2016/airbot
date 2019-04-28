

 const Sequelize = require('sequelize');


const fav_list =  {
 
     trip_id       : {
          type:Sequelize.INTEGER,
           reference:"trips",
           referenceKey:"id",
              unique:"compositeIndex"

          

      },
    user_id       : {
          type:Sequelize.INTEGER,
           reference:"users",
           referenceKey:"id",
           unique:"compositeIndex"

          

      }

}


 
module.exports = (sequelize, type) => {return sequelize.define("fav_list",fav_list)}