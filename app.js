$('#nav-selection').hide()
var endpoint = "https://newsapi.org/v1/";
var key = "?apikey=33ab9964e9c846c188f51c69d74f9576";
var sources = endpoint + "sources/" + key;
var articles = endpoint + "articles/" + key + "&source=";
var categories = ['technology','general','entertainment','music'];
var categorySites = {technology:[],general:[],entertainment:[]};
var heroEntry = document.getElementById('hero-container')
var entriesContainer = document.getElementById('entries-container')
var blocked = ["the-lad-bible","mtv-news-uk","bild","der-tagesspiegel","spiegel-online","the-hindu","the-times-of-india","gruenderszene","t3n","focus","wired-de"];

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
    for(var j=0;j<3;j++){
      var randomSource = Math.floor(Math.random() * topicList.length)
      articleSources.push(articles + topicList[randomSource])
    }
    findArticles(articleSources)
  })
}

function findArticles(articleSources){
  for(var i=0;i<articleSources.length;i++){
    fetch(articleSources[i]).then(function(response){
      return response.json().then(function(data){
        var randomArticle = Math.floor(Math.random() * data.articles.length)
        var article = data.articles[randomArticle]
        if(article.author==null||article.title==null||article.description==null||article.url==null||article.urlToImage==null||article.author==""||article.title==""||article.description==""||article.url==""||article.urlToImage==""){
          var emptyEntry = true
          while(emptyEntry==true){
            if(article.author==null||article.title==null||article.description==null||article.url==null||article.urlToImage==null||article.author==""||article.title==""||article.description==""||article.url==""||article.urlToImage==""){
              console.log(article)
              console.log("trying again..")
              var randomArticle = Math.floor(Math.random() * data.articles.length)
              article = data.articles[randomArticle]
              console.log(article)
            }else{
              emptyEntry=false
            }
          }
        }
        var articleAuthor = article.author
        var articleTitle = article.title
        var articleDesc = article.description
        var articleUrl = article.url
        var articleImg = article.urlToImage
        appendArticles(articleAuthor,articleTitle,articleDesc,articleUrl,articleImg,i)
      })
    })
  }
}

function appendArticles(author,title,desc,url,img,idNum){
  $("#entry-container").append(
    `<div class="entry-posts" id="entry-post-${idNum}">
      <img src="${img}" alt="" class="entry-img">
      <div class="entry-desc" id="entry-desc-${idNum}">
        <p class="entry-title" id="entry-title-${idNum}">${title}</p>
        <div class="entry-by" id="entry-by-${idNum}">by
          <span class="author-name" id=entry-author-${idNum}>${author}</span>
        </div>
      </div>
    </div>`
  )
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
