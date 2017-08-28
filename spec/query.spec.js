const query= require("../bin/query");


describe("simplequery", function () {
  it("should run simple query", function (done) {
    //var product = calculator.multiply(2, 3);
    query.runQuery("select * from dual").then(function(result){
      expect(result.rows[0].DUMMY).toBe("X")
      done();
    });
  });
});  
