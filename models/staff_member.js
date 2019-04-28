

 const Sequelize = require('sequelize');


const staff_member =  {
    name          : Sequelize.STRING ,
    age           : Sequelize.INTEGER ,
    gender        : Sequelize.STRING   ,
     company_id       : {
          type:Sequelize.INTEGER,
           reference:"companies",
           referenceKey:"id"
          

      }
}


 
module.exports = (sequelize, type) => {return sequelize.define("staff_member",staff_member)}