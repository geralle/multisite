$('#nav-selection').hide()
var endpoint = "https://newsapi.org/v1/";
var key = "?apikey=33ab9964e9c846c188f51c69d74f9576";
var sources = endpoint + "sources/" + key;
var articles = endpoint + "articles/" + key + "&source=";
var categories = ['technology','general','entertainment','music'];
var categorySites = {technology:[],general:[],entertainment:[]};
var heroEntry = document.getElementById('hero-container')
var entriesContainer = document.getElementById('entries-container')
var blocked = ["the-lad-bible","mtv-news-uk","bild","der-tagesspiegel","spiegel-online","the-hindu","the-times-of-india","gruenderszene","t3n","focus"];

function blockSites(sites){
  for(var i=0;i<Object.keys(sites).length;i++){
    for(var x=0;x<sites[Object.keys(sites)[i]].length;x++){
      for(var b=0;b<blocked.length;b++){
        if(blocked[b]==sites[Object.keys(sites)[i]][x]){
          sites[Object.keys(sites)[i]][x] = ""
        }
      }
    }
  }
  return sites
}

function getData(){
  return fetch(sources)
    .then(function(response){
      return response.json()
        .then(function(newsData){
          for (var c = 0; c<categories.length; c++) {
            for(var i=0;i<newsData.sources.length;i++){
              if(categories[c]==newsData.sources[i].category){
                switch (newsData.sources[i].category) {
                  case 'technology':
                    var technologySites = [newsData.sources[i].id];
                    categorySites['technology'].push(technologySites)
                    break;
                  case 'general':
                    var generalSites = [newsData.sources[i].id];
                    categorySites['general'].push(generalSites)
                    break;
                  case 'entertainment':
                    var entertainmentSites = [newsData.sources[i].id];
                    categorySites['entertainment'].push(entertainmentSites)
                    break;
                  case 'music':
                    var entertainmentSites = [newsData.sources[i].id];
                    categorySites['entertainment'].push(entertainmentSites)
                    break;
                  default:
                    console.log(newsData.sources[i].id)
                }
              }
            }
          }
      return blockSites(categorySites)
    })
  })
}

function getTopic(){
  navSection = document.getElementById('nav-container')
  techTag = document.getElementById("tech")
  navSection.addEventListener("click",function(event){
    var selectedTopic = event.srcElement.innerText
    var topic = "";
    switch(selectedTopic){
      case 'TECH':
        topic = "technology";
        break;
      case 'ENTERTAINMENT':
        topic = "entertainment";
        break;
      case 'WORLD':
        topic = 'general';
        break;
      default:
        console.log('Nothing Selected')
    }
    appendContent(topic)
  })
}

var topicList = []
var topicArticle = ""
function appendContent(topic){
  return getData().then(function(siteList){
    // console.log(siteList[topic])
    for(var i=0;i<siteList[topic].length; i++){
      if(siteList[topic][i]!=""){
        topicList.push(siteList[topic][i])
      }
    }

    console.log(topicList)
    topicList = emptyArr(topicList)
    console.log(topicList.length)
    // for(var t=0;t<topicList.length;t++){
    //   topicArticle = articles + topicList[t]
    //   console.log(topicArticle)
    // }
  })
}

function emptyArr(topicList){
  for(var i=0;i<topicList.length;i++){
    topicList.pop()
  }
  return topicList
}

var closeMenu = document.getElementById('close-menu')
var openMenu = document.getElementById('open-menu-button')

closeMenu.addEventListener('click',function(){
  $('#nav-selection').hide()
  $('#open-menu-button').show()
})

openMenu.addEventListener('click',function(){
  $('#open-menu-button').hide()
  $('#nav-selection').show()
})

getTopic()
