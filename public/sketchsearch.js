function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

checkMarks();
extract();
loader();
setTimeout(function(){
    $("#topic-checklist ul li img")[0].click();
    setTimeout(function(){$("#topic-checklist ul li img")[0].click();}, 150);
}, 700);

//for the checkmarks
$("#topic-checklist ul li img").click(function(){
    if($(this).attr("src")==="assets/checked.svg"){
      $(this).attr("src", "assets/unchecked.svg");
    }
    else{
      $(this).attr("src", "assets/checked.svg");
    }
    //calls to update when user checks off items
    checkMarks();
    extract();
    loader();
    $("#You").trigger("submit");
  });

  var sessionTitle=$('#topic').text();

//finds the most recent unchecked checklist item and records
//it's 'index' with recentUnchecked
var recentUnchecked = 0;
function checkMarks(){
  for(var i = 0; i <= $('#topic-checklist ul li img').length; i ++){
    if ($('#topic-checklist ul li img').eq(i).attr('src') === "assets/unchecked.svg" )  {
      recentUnchecked = i;
      break;
    }
  }
}
//gets thing to search
var topic = $('#topic-checklist ul li')[0].innerHTML.substring(32);
function extract(){
    topic = $('#topic-checklist ul li')[recentUnchecked].innerHTML.substring(32);
}

//loads topic
function loader(){
    $('#searcher').attr('value', topic);
}



$(function() {
    $("#You").on('submit', function(e) {
       e.preventDefault();
       // prepare the request
       $("searcher").val()
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: topic + " " + sessionTitle + " math",
            maxResults: 7,
            order: "relevance",
            publishedAfter: "2007-01-01T00:00:00Z"
       });
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId, "thumb":item.snippet.thumbnails.default.url}]));
            });
          });
          resetVideoHeight();
       });
    });

    $(window).on("resize", resetVideoHeight);
});



function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyCXr4nPaCa0iGMFYiX_QRaJ43noyvZGxGo");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}
