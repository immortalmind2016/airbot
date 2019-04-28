 
 const Sequelize = require('sequelize');

const  airport = {

   name: Sequelize.STRING ,
   country         : Sequelize.STRING ,
   state           : Sequelize.STRING ,
   city            : Sequelize.STRING ,
   zip_code        : Sequelize.STRING ,

   

}
module.exports = (sequelize, type) => {return sequelize.define("airport",airport)}