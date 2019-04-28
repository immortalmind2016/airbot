 
 const Sequelize = require('sequelize');

const  user = {
    email    :{
      type: Sequelize.STRING ,
      unique:true,
    },
    phone    : Sequelize.STRING ,
    age      :  Sequelize.INTEGER ,
    name     : Sequelize.STRING ,
    type     : Sequelize.INTEGER ,
    coins    : Sequelize.INTEGER ,
    password : Sequelize.STRING ,
    gender   : Sequelize.STRING ,
    location: Sequelize.STRING

}

module.exports = (sequelize, type) => {return sequelize.define("user",user)}