import Promise = require('bluebird');
import oracledb = require('oracledb');
import fs = require("fs-extra");
import path = require("path");

const connection : oracledb.IConnectionAttributes=require('../connection.json');

  // var x=require("./sql/debitosSuspensos.sql.json");
  // let saida=[];
  // for(let id in x){
  //   saida.push(x[id]["codigo identificacao"])
  // };
  // console.log(saida)
export function runFromFile(sqlFile:string):Promise<oracledb.IExecuteReturn>{
  let dir=path.join(process.cwd(),sqlFile);

  return run(Promise.resolve(fs.readFile(dir, "utf8")))
  .then(function(result) {
    fs.writeFile(dir+'.json',JSON.stringify(result.rows,null,2));
    return result;
  });
}

interface IQueryOptions{
  targetFile:string,
  unique:[string],
}
export function runQuery(sqlQuery:string,options?:IQueryOptions):Promise<oracledb.IExecuteReturn>{
  return run(sqlQuery )
  .then(function(result) {
  
    return result;
  });
}

function run(sql:Promise<string>|string):Promise<oracledb.IExecuteReturn>{
  return Promise.all([
    <Promise<oracledb.IConnection>>oracledb.getConnection(connection),
    sql
  ]).then(function(queryData){
    return {
      connection:queryData[0],
      query:queryData[1]
    }
  })
  .then(function(config) {
    return <Promise<oracledb.IExecuteReturn>>config.connection.execute(config.query,[],{outFormat:oracledb.OBJECT})
  })
  
  .catch(function(err:string) {
    console.error(err);
  });
}
