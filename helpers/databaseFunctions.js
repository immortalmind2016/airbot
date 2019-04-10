

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
const select=(coulmnName,tableName,condition)=>(

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
    

const insert=(tableName,coulmns,values)=>(
  
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

module.exports={
    insert,
    select,
    update

}