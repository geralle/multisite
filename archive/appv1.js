var endpoint = "https://newsapi.org/v1/";
var key = "?apikey=33ab9964e9c846c188f51c69d74f9576";
var sources = endpoint + "sources/" + key;
var articles = endpoint + "articles/" + key + "&source=";
var categories = ['technology','general','entertainment','music'];
var categorySites = {technology:[],general:[],entertainment:[]};
var heroEntry = document.getElementById('hero-container')
var entriesContainer = document.getElementById('entries-container')

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
          return categorySites
    })
  })
}

function heroSiteList(){
  var randSites = {};
  var randSitesList = [];
  return getData()
    .then(function(siteHero){
      for(var i=0;i<Object.keys(siteHero).length;i++){
        var randCatSite = Math.floor(Math.random()*siteHero[Object.keys(siteHero)[i]].length)
        randSites[Object.keys(siteHero)[i]] = siteHero[Object.keys(siteHero)[i]][randCatSite]
      }
      // console.log(randSites)
      for(var j=0;j<Object.keys(randSites).length;j++){
        randSitesList.push(articles + Object.values(randSites)[j][0]);
      }
      return randSitesList
  })
}

function appendHero(){
  heroSiteList()
    .then(function(siteList){
      for(var i=0;i<siteList.length;i++){
        var site = siteList[i]
        fetch(site).then(function(response){
          return response.json().then(function(heroArticle){
            var articleIndex = Math.floor(Math.random()*heroArticle.articles.length)
            author = heroArticle.articles[articleIndex].author
            title = heroArticle.articles[articleIndex].title
            articleImg = heroArticle.articles[articleIndex].urlToImage
            articleUrl = heroArticle.articles[articleIndex].url
            var divTag = document.createElement('div')
            var h3Tag = document.createElement('h3');
            var imgTag = document.createElement('img');
            var pTag = document.createElement('p');
            divTag.setAttribute('class','hero-entries')
            imgTag.setAttribute('src',articleImg)
            imgTag.setAttribute('class','hero-images')
            h3Tag.innerText=title
            checkNull(author, title, articleImg, articleUrl)
            heroEntry.append(divTag)
            divTag.append(imgTag)
            divTag.append(h3Tag)
            divTag.append("- " + author)
          })
        })
      }
  })
}

function checkNull(author, title, articleImg, articleUrl){
  // console.log(author, title, articleImg, articleUrl)
  if(author === null || title === null || articleImg === null || articleUrl === null){
    divTag.innerHTML = ""
    appendHero();
  }
}

appendHero()
