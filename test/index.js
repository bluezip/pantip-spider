var pantip    = require('../src/index');
var should    = require('should');


describe('Pantip', function(){
  this.timeout(120 * 1000);

  it(':page', function(done){
    pantip.page('http://pantip.com/topic/32414312',function(err,data){

      data.title.should.be.type('string');
      data.description.should.be.type('string');
      data.keyword.should.be.an.Array;
      data.comment.should.be.an.Array;

      if(err){ done(err); }else{ done(); }
    });
  });

  it(':forum', function(done){
    pantip.forum('http://pantip.com/forum/food',function(err,data){
      data.should.be.an.Array;
      console.log(data);
      if(err){ done(err); }else{ done(); }
    });
  });
});