PANTIP - SPIDER
____________________________________

## Install

    npm install bluezip/pantip-spider --save



## Quick Examples

```javascript
var pantip          = require('pantip-spider');

pantip.forum('http://pantip.com/forum/food',function(err,data){
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
});


pantip.page('http://pantip.com/topic/32427222',function(err,data){
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
});
```