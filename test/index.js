var pantip    = require('../src/index');
var should    = require('should');


describe('Pantip', function(){
  this.timeout(120 * 1000);
  var link  = '';

  it(':forum', function(done){
    pantip.forum('http://pantip.com/forum/food',function(err,data){
      data.should.be.an.Array;
      link  = data[0].link;
      if(err){ done(err); }else{ done(); }
    });
  });



  it(':page', function(done){
    pantip.page('http://pantip.com'+link,function(err,data){
      data.title.should.be.type('string');
      data.description.should.be.type('string');
      data.keyword.should.be.an.Array;
      data.comment.should.be.an.Array;
      if(err){ done(err); }else{ done(); }
    });
  });
});