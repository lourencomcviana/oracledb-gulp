import query = require("./query");

query.run(process.argv[2]+'.sql')
.then(function(db) {
  console.log('ended '+new Date().toISOString()+' '+process.argv[2]);
})
.catch(function(err) {
  console.error(err);
});
console.log('start '+new Date().toISOString()+' '+process.argv[2])