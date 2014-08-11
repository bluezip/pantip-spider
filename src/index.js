var HtmlSnapshot  =  require('phantom-html-snapshot');
var cheerio       = require('cheerio');
var async         = require('async');

module.exports = {

  // Get data
  page : function(url,done){

    HtmlSnapshot.snapshot(url, function (err, html) {
      if (!err) {
        var $ = cheerio.load(html);
        var data = {};
        async.series([
            function(callback){
              data.url    = url;
              data.html   = $.html();
              callback(null, data);
            },
            // Get title
            function (callback) {
              $('h2.display-post-title').first().filter(function () {
                data.title = $(this).text().trim();
                callback(null, data);
              });
            },
            // Get description
            function (callback) {
              $('div.display-post-status-leftside div.display-post-story-wrapper div.display-post-story').first().filter(function () {
                data.description = $(this).text().trim();
                callback(null, data);
              });
            },
            // Get avatar
            function(callback){
              $('div.display-post-story-footer div.display-post-action div.display-post-avatar a img').first().filter(function(){
                data.avatar = $(this).attr('src').trim();
                if(data.avatar.match(/^\/(.*)/i)) {
                  data.avatar = 'http://www.pantip.com'+data.avatar;
                }
                callback(null, data);
              });
            },
            // Get keyword
            function (callback) {
              keyword = [];
              $('div.display-post-status-leftside div.display-post-tag-wrapper a.tag-item').filter(function (index, elem) {
                keyword.push($(this).html());
                if (index === $('div.display-post-status-leftside div.display-post-tag-wrapper a.tag-item').length - 1) {
                  data.keyword = keyword;
                  callback(null, data);
                }
              });
            },
            // Get comment
            function (callback) {
               comment = [];
              $('div.display-post-status-leftside div.display-post-story-wrapper.comment-wrapper div.display-post-story').filter(function (index, elem) {
                if($(this).text().trim() !== ''){
                  var avatar = $(this).parents('div.display-post-status-leftside').find('div.display-post-story-footer a.avatarlink img').attr('src');
                  if(avatar.match(/^\/(.*)/i)) {
                    avatar = 'http://www.pantip.com'+avatar;
                  }
                  comment.push({comment: $(this).text().trim(), avatar: avatar});
                }
                if (index === $('div.display-post-status-leftside div.display-post-story-wrapper.comment-wrapper div.display-post-story').length - 1) {
                  data.comment = comment;
                  callback(null, data);
                }
              });
            }
          ]
          , function (err, resule) {
            done(null,data);
          });
      }else{
        done(new Error('Can not load url: '+url));
      }
    }); // HtmlSnapshot
  },


  // Get many url
  forum: function(url,done){
    HtmlSnapshot.snapshot(url, function (err, html) {
      if (!err) {
        var $ = cheerio.load(html);
        var data = [];
        $('div#index-main.col-main-inner div#show_topic_lists.post-list-wrapper div.post-item div.post-item-title a').filter(function(index,elem){
          data.push({
            name: $(this).text().trim(),
            link: 'http://www.pantip.com'+$(this).attr('href')
          });
          if(index === $('div#index-main.col-main-inner div#show_topic_lists.post-list-wrapper div.post-item div.post-item-title a').length - 1){
            done(null,data);
          }
        });
      } else {
        done(new Error('Can not load url: ' + url));
      }
    }); // HtmlSnapshot
  }
};
