import Promise = require('bluebird');
import oracledb = require('oracledb');
import fs = require("fs-extra");
import path = require("path");

const connection : oracledb.IConnectionAttributes=require('../connection.json');



export function run(sqlFileName:string):Promise<oracledb.IExecuteReturn>{
  let dir=path.join(__dirname,  '..','sql',sqlFileName);

  return Promise.all([
    <Promise<oracledb.IConnection>>oracledb.getConnection(connection),
    fs.readFile(dir, "utf8")
  ]).then(function(queryData){
    return {
      connection:queryData[0],
      query:queryData[1]
    }
  })
  .then(function(config) {
    return <Promise<oracledb.IExecuteReturn>>config.connection.execute(config.query,[],{outFormat:oracledb.OBJECT})
  })
  .then(function(result) {
    
    fs.writeFile(dir+'.json',JSON.stringify(result.rows,null,2));
    return result;
  })
  .catch(function(err:string) {
    console.error(err);
  });
}
