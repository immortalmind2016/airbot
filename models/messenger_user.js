

 const Sequelize = require('sequelize');


const MessengerUser = {

      user_id            :{
          type:Sequelize.STRING ,
                unique:true,

      }
      
    
}

 
module.exports = (sequelize, type) => {return sequelize.define("MessengerUser",MessengerUser)}