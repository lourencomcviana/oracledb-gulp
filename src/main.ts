import query = require("./query");


const yargs=require('yargs')
.usage('$0 <cmd> [args]')
.command('query [queryString]', 'run a sql query and save it as json', {
  queryString: {
    alias:"q",
    describe: 'sql file text',
    //demandOption: 'the sql you need to run must be passed',
    string: true
  },
  sqlFile: {
    alias:"f",
    describe: 'sql file path',
    //demandOption: 'the sql file path you need to run must be passed',
    string: true
  }
}, function (argv:any) {
  return run(argv);
})
.example('$0 query --f sql/example.sql', "use a sql file as query source")
.example('$0 query \"select * from dual\"', "use command line as query source")
.demandCommand(1, 'You need at least one command before moving on')
//.demandOption([ 'path'], 'Please provide both run and path arguments to work with this tool')
.help()
.argv

//console.log('rodanedo');
function run(argv:any){
  let promise;
  if(argv.sqlFile){
    promise=query.runFromFile(argv.sqlFile);
  }else{
    promise=query.runQuery(argv.queryString);
  }
  promise.then(function(db) {
    if(!argv.sqlFile)
      console.log(JSON.stringify(db.rows,null,2))
    console.log('ended '+new Date().toISOString() );
  })
  .catch(function(err) {
    console.error(err);
  });
  console.log('start '+new Date().toISOString() )
  return promise;
}
