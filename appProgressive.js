//for the checkmarks
setTimeout(function(){ alert("Hello"); }, 5000);

$("#HomeCheckList ul li img").click(function(){
  if($(this).attr("src")==="assets/checked.svg"){
    $(this).attr("src", "assets/unchecked.svg");
  }
  else{
    $(this).attr("src", "assets/checked.svg");
  }
  //calls to update when uesr checks off items
  checkMarks();
});


//for the YouTube

//finds the most recent unchecked checklist item and records
//it's 'index' with recentUnchecked
var recentUnchecked = 0;
function checkMarks(){
  for(var i = 0; i <= $('#HomeBody ul li img').length; i ++){
    if ($('#HomeCheckList ul li img').eq(i).attr('src') === "assets/unchecked.svg" )  {
      recentUnchecked = i;
      break;
    }
  }
}


function onClientLoad() {
  gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
  gapi.client.setApiKey('AIzaSyD7NybHdEUpObHST_6kkWtK3TYVWZnYKV8');
  searcher();
}

//placeholder search function with the essetial values we need
//maxReults to type are the important values
/*
function search() {
  var request = gapi.client.youtube.search.list({
      maxResults: '7',
      part: 'id',
      q: $('#HomeBody ul li')[recentUnchecked].innerHTML.substring(32),
      type: 'video'
  });
}
*/

//this tests checkMarks method
console.log($('#HomeCheckList ul li')[recentUnchecked].innerHTML.substring(32));

//working on alternate search because previous search is not working
//https://www.youtube.com/watch?v=AF_SzRN6fYM&pbjreload=10
//look at above link

var q =  $('#HomeCheckList ul li')[recentUnchecked].innerHTML.substring(32);

console.log(q);
var get = gapi.client.youtube.search.list(
  {
    maxResults: '7',
    part: 'id',
    q: q,
    type: video
  }
)
console.log(get);










function searcher() { 
  console.log("entered");

   var q =  $('#HomeCheckList ul li')[recentUnchecked].innerHTML.substring(32);
  
   console.log(q);

   $.GET, "https://www.googleapis.com/youtube/v3/search", {
    maxResults: '7',
    part: 'id, snippet',
    q: q,
    type: 'video',
    key: 'AIzaSyD7NybHdEUpObHST_6kkWtK3TYVWZnYKV8'},

    console.log("doned");

      $.each(data.items, function(i, item){
        var output = getOutput(item);
        $('#result').append(output);
      })      

    }
function getOutput(item){
      var videoId = item.id.videoId;
      var title = item.snippet.title;

      var output = '<li class="resourceitem">'+
      '<a href="https://www.youtube.com/watch?v="' +videoId+ '>'+
      title +
      '</a>'+
      '</li>';
}