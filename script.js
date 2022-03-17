
const API = "ff42784635a395ed13febc429bd0db3f";
// API 2: a96c35239d7b07371a7cf56d78e6ebd0
const topHeadlinesURL = "https://gnews.io/api/v4/top-headlines?country=us&token=";


$(document).ready(function(){
    showNews(topHeadlinesURL);
    $("#search").click(function(){
        $("#search-box").show(300);
        $("#showArea").fadeTo("slow", 0.2);
        $("#header").fadeTo("slow", 0.2);
    });
    $("#close").click(function(){
        $("#search-box").hide(300);
        $("#showArea").fadeTo("slow", 1);
        $("#header").fadeTo("slow", 1);
    })
    $("#search-submit").click(function(){
        let searchKeywords = $("#search-keywords").val();
        let searchURL = "";
        let searchStart = $("#start").val() + "T00:00:00Z";
        let searchEnd = $("#end").val() + "T00:00:00Z";

        switch (true){
            case (searchStart == "" && searchEnd == ""):
                searchURL =  "https://gnews.io/api/v4/search?q=" + searchKeywords +"&token=";
                break;
            case (searchStart == ""):
                searchURL = "https://gnews.io/api/v4/search?q="+ searchKeywords + "&to=" + searchEnd + "&token=";
                break;
            case (searchEnd == ""):
                searchURL = "https://gnews.io/api/v4/search?q="+ searchKeywords + "&from=" + searchStart  + "&token=";
                break;
            default:
                searchURL = "https://gnews.io/api/v4/search?q="+ searchKeywords + "&from=" + searchStart + "&to=" + searchEnd + "&token=";
        }

        showNews(searchURL);
        $("#search-box").hide(300);
        $("#showArea").fadeTo("slow", 1);
        $("#header").fadeTo("slow", 1);
    })
    $("#home").click(showNews(topHeadlinesURL));
})
function showNews(url){
    $("#showArea").html("");
    const xhttp = new XMLHttpRequest();
    $("#loading-gif").show();
    xhttp.onload = function(){
        $("#loading-gif").hide();
        const data = JSON.parse(this.responseText);
        let content = data.articles;
        for (let index = 0; index < content.length; index++) {
            let title = content[index].title;
            let description = content[index].description;
            let url = content[index].url;
            let image = content[index].image;
            let publishedAt = content[index].publishedAt;
            $("#showArea").append(showContent(title, description, url, image, publishedAt))
        }
    };
    xhttp.open("GET", url + API);
    xhttp.send();
    function showContent(title, description, url, image, publishedAt){
        let img = '<img class=\"img-content col-lg-3 col-sm-6 col-md-6 col-xs-12\" src\=' + image +' alt\='+title+'>';
        let link = '<a class="url" target="_blank" href=' + url + '>' + title +'</a>';
        let time = '<p class="publishedTime">' + publishedAt + '</p>';
        let content = '<p>' + description + '</p>';
        let div = "<div class=\"article container-fluid\">" + img + '<div class=\"content col-lg-9 col-sm-6 col-md-6 col-xs-12\">'+ link + time + content +"</div></div><br>"
        return div;
    }
}
