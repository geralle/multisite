var endpoint = "https://newsapi.org/v1/";
var key = "?apikey=33ab9964e9c846c188f51c69d74f9576";
var sources = endpoint + "sources/" + key;
var articles = endpoint + "articles/" + key + "&source=";

var initialArticles = ["https://newsapi.org/v1/articles/?apikey=33ab9964e9c846c188f51c69d74f9576&source=the-verge","https://newsapi.org/v1/articles/?apikey=33ab9964e9c846c188f51c69d74f9576&source=engadget","https://newsapi.org/v1/articles/?apikey=33ab9964e9c846c188f51c69d74f9576&source=the-guardian-au","https://newsapi.org/v1/articles/?apikey=33ab9964e9c846c188f51c69d74f9576&source=time","https://newsapi.org/v1/articles/?apikey=33ab9964e9c846c188f51c69d74f9576&source=bbc-news","https://newsapi.org/v1/articles/?apikey=33ab9964e9c846c188f51c69d74f9576&source=ars-technica"]

function blockSites(sites){
  var blocked = ["the-lad-bible","mtv-news-uk","bild","der-tagesspiegel","spiegel-online","the-hindu","the-times-of-india","gruenderszene","t3n","focus","wired-de"];

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
  var categories = ['technology','general','entertainment','music'];
  var categorySites = {technology:[],general:[],entertainment:[]};
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
    $("#entry-container").empty()
    var selectedTopic = event.target.id.toUpperCase()
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
    topicArticles(topic)
  })
}

function topicArticles(topic){
  return getData().then(function(siteList){
    var topicList = []
    for(var i=0;i<siteList[topic].length; i++){
      if(siteList[topic][i]!=""){
        topicList.push(Object.values(siteList[topic][i])[0])
      }
    }
    var articleSources = []
    for(var j=0;j<10;j++){
      var randomSource = Math.floor(Math.random() * topicList.length)
      articleSources.push(articles + topicList[randomSource])
    }
    findArticles(articleSources, '#entry-container')
  })
}

function findArticles(articleSources, articleLocation){
  for(var i=0;i<articleSources.length;i++){
    fetch(articleSources[i]).then(function(response){
      return response.json().then(function(data){
        var randomArticle = Math.floor(Math.random() * data.articles.length)
        var article = data.articles[randomArticle]
        if(article.author==null||article.title==null||article.description==null||article.url==null||article.urlToImage==null||article.author==""||article.title==""||article.description==""||article.url==""||article.urlToImage==""){
          var emptyEntry = true
          var counter = 0;
          while(counter<=5){
            if(article.author==null||article.title==null||article.description==null||article.url==null||article.urlToImage==null||article.author==""||article.title==""||article.description==""||article.url==""||article.urlToImage==""){
              console.log("trying again..")
              var randomArticle = Math.floor(Math.random() * data.articles.length)
            }else{
              emptyEntry=false
            }
            counter++;
          }
        }
        var articleAuthor = article.author
        var articleTitle = article.title
        var articleDesc = article.description
        var articleUrl = article.url
        var articleImg = article.urlToImage
        appendArticles(articleAuthor,articleTitle,articleDesc,articleUrl,articleImg,i,articleLocation)
      })
    })
  }
}

function appendArticles(author,title,desc,url,img,idNum, articleLocation){
  var heroSection =
    `<img src="${img}" alt="" id="hero-img">
    <div id="hero-container">
      <p id="hero-title">${title}</p>
      <p id="hero-desc">${desc}</p>
      <p id="hero-by-line">by
        <span id="hero-author-name">${author}</span>
      </p>
    </div>`

  var entrySection =
    `<div class="entry-posts" id="entry-post-${idNum}">
      <img src="${img}" alt="" class="entry-img">
      <div class="single-entry-container" id="single-entry-${idNum}">
        <p class="entry-title" id="entry-title-${idNum}">${title}</p>
        <p class="entry-desc" id="entry-desc-${idNum}">${desc}</p>
        <p class="entry-by" id="entry-by-${idNum}">by
          <span class="author-name" id=entry-author-${idNum}>${author}</span>
        </p>
      </div>
    </div>`

  if(articleLocation=="#hero-image"){
    $(articleLocation).append(heroSection)
  }else{
    $(articleLocation).append(entrySection)
  }
}

function generateHero() {
  var randomHero = Math.floor(Math.random() * initialArticles.length)
  var heroArticle = []
  heroArticle.push(initialArticles[randomHero])
  findArticles(heroArticle, "#hero-image")
}

function homepageLoad(){
  $('#nav-selection').hide()
  var closeMenu = document.getElementById('close-menu')
  var openMenu = document.getElementById('open-menu-button')
  generateHero()
  findArticles(initialArticles, '#entry-container')
}

homepageLoad()
getTopic()
