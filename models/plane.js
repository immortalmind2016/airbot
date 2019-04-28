

 const Sequelize = require('sequelize');


const plane = {

      model            : Sequelize.STRING ,
      seating_capacity : Sequelize.STRING 
    
}

 
module.exports = (sequelize, type) => {return sequelize.define("plane",plane)}