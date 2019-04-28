

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : "root",
  password : '',
  database:"airbot"
});
/*

CoulmnName => name or *
tableName => name
condition =>
for example (id=5) or 1 to select without conditions

*/


/*
@args Coulmn Name , Table name , condition
@desc find By * or by Condition
@return Promise with data
*/
const find=(coulmnName,tableName,condition)=>(

    new Promise((resolve,reject)=>{
             let conColVal=condition.split("=")
        var query = `SELECT ${coulmnName} FROM ${tableName} WHERE ${condition.length==0?"":conColVal[0]+"='"+conColVal[1]+"'"}`;
        connection.query(query, function (error, results, fields) {
        if (error) {
            reject(error)
        }
        else{
            resolve(results)
        }
        
    });
    })
)
    
/*
@args Coulmn Name , Table name , values
@desc create new record
@return Promise with data
*/
const create=(tableName,coulmns,values)=>(
  
    new Promise((resolve,reject)=>{
          let mappedCoulmns="(";
          coulmns.forEach((coulmn,index)=>{
            
                mappedCoulmns+=coulmn
                    if(index!=coulmns.length-1){
                        mappedCoulmns+=",";
                    }
            
        })
            mappedCoulmns+=")"
 let mappedValues="(";
          values.forEach((value,index)=>{
            
                mappedValues+='"'+value+'"'
                    if(index!=values.length-1){
                        mappedValues+=",";
                    }
            
        })
            mappedValues+=")"

        var query = `INSERT INTO ${tableName} ${coulmns.length!=0?mappedCoulmns:""} VALUES ${mappedValues}`;
        console.log(query)
        connection.query(query, function (error, results, fields) {
        if (error) {
            reject(error)
        }
        else{
            resolve(results)
        }
        
    });
    })
)

/*
@args new Data , Table name , condition
@desc update recored
@return Promise with data
*/

const update=(tableName,newData,condition)=>(
 new Promise((resolve,reject)=>{
      let conColVal=condition.split("=")
      let data="";
      Object.keys(newData).forEach((key,index)=>{
        data+=Object.keys(newData)[index]+"='"+Object.values(newData)[index]+"'"
        if(index!=Object.keys(newData).length-1){
            data+=" , "
        }
        
      })
        var query =`UPDATE ${tableName} SET ${data} WHERE ${condition.length==0?"":conColVal[0]+'="'+conColVal[1]+'"'}`;
        connection.query(query, function (error, results, fields) {
        if (error) {
            reject(error)
        }
        else{
            resolve(results)
        }
        
    });
    })
)
/*
@args table one  , Table two , shared coulmn
@desc update recored
@return Promise with data
*/

const innerJoin=(tableOne,tabelTwo,coulmnName)=>{
    new Promise((resolve,reject)=>{
        
       var query=`SELECT *
FROM ${tableOne}
INNER JOIN ${tableTwo}
ON tableOne.${coulmnName}= tableTwo.${coulmnName}`
        connection.query(query, function (error, results, fields) {
        if (error) {
            reject(error)
        }
        else{
            resolve(results)
        }
        
    });
    })
}

/*
@args table name and condition
@desc delete record
@return Promise with data
*/

const destroy=(tableName,condition)=>(

    new Promise((resolve,reject)=>{
             let conColVal=condition.split("=")
        var query = `DELETE FROM ${tableName} WHERE ${condition.length==0?"":conColVal[0]+"='"+conColVal[1]+"'"}`;
        connection.query(query, function (error, results, fields) {
        if (error) {
            reject(error)
        }
        else{
            resolve(results)
        }
        
    });
    })
)

module.exports={
    create,
    find,
    update,
    innerJoin,
    destroy

}