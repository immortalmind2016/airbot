 
 const Sequelize = require('sequelize');

const trip = {

    arrival_Time     : Sequelize.DATE   ,
    arrival_Airport  : {
        type:Sequelize.INTEGER,
        reference:"airport",
        
        referenceKey:"id"
    },
    leaving_Time     : Sequelize.DATE ,
    leaving_Airport  : {
        type:Sequelize.INTEGER,
        reference:"airport",
        referenceKey:"id"
    },
    seats_numer:Sequelize.INTEGER,
    amount           : Sequelize.FLOAT  ,
    tax              : Sequelize.FLOAT ,
    discount         : Sequelize.FLOAT ,
    final_Amount     : Sequelize.FLOAT ,
    plane_id      : {
        type:Sequelize.INTEGER,
        reference:"planes",
        referenceKey:"id"
    } ,
    image:Sequelize.STRING,
    desc:Sequelize.STRING,
    company_id       : {
        type:Sequelize.INTEGER ,
        reference:"companies",
        referenceKey:"id"
    }

}
module.exports = (sequelize, type) => {return sequelize.define("trip",trip)}