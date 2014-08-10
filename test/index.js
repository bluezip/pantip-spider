var pantip    = require('../src/index');
var should    = require('should');


describe('Pantip', function(){
  this.timeout(150 * 1000);
  var link  = '';

  it(':forum', function(done){
    pantip.forum('http://pantip.com/forum/food',function(err,data){
      data.should.be.an.Array;
      link  = data[0].link;
      if(err){ done(err); }else{ done(); }
    });
  });



  it(':page', function(done){
    pantip.page(link,function(err,data){
      if(err){
        done(err);
      }else{
        data.title.should.be.type('string');
        data.description.should.be.type('string');
        data.keyword.should.be.an.Array;
         done();
      }
    });
  });
});