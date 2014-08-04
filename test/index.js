var pantip    = require('../index');

pantip.load('http://pantip.com/topic/32414312',function(err,json){
  console.log(json);
});