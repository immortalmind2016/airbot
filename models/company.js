 
 const Sequelize = require('sequelize');

const  company = {
     facebook_url        : Sequelize.STRING ,
     twitter_url         : Sequelize.STRING ,
     linkidin_url        : Sequelize.STRING ,
     address             : Sequelize.STRING ,
     describtion         : Sequelize.TEXT  ,
     logo_url            :  Sequelize.STRING ,
     establishment_date  : Sequelize.DATE ,
     company_name        : Sequelize.STRING ,
     user_id             :{
         type: Sequelize.INTEGER,
         reference:"users",
         referenceKey:"id",
         unique:true
     }
}
module.exports = (sequelize, type) => {return sequelize.define("company",company)}