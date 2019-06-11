var lunrIndex,pagesIndex;function endsWith(str,suffix){return str.indexOf(suffix,str.length-suffix.length)!==-1;}
function initLunr(){if(!endsWith(baseurl,"/")){baseurl=baseurl+'/'};$.getJSON(baseurl+"index.json").done(function(index){pagesIndex=index;lunrIndex=lunr(function(){this.ref("uri");this.field('title',{boost:15});this.field('tags',{boost:10});this.field("content",{boost:5});this.pipeline.remove(lunr.stemmer);this.searchPipeline.remove(lunr.stemmer);pagesIndex.forEach(function(page){this.add(page);},this);})}).fail(function(jqxhr,textStatus,error){var err=textStatus+", "+error;console.error("Error getting Hugo index file:",err);});}
function search(queryTerm){return lunrIndex.search(queryTerm+"^100"+" "+queryTerm+"*^10"+" "+"*"+queryTerm+"^10"+" "+queryTerm+"~2^1").map(function(result){return pagesIndex.filter(function(page){return page.uri===result.ref;})[0];});}
initLunr();$(document).ready(function(){var searchList=new autoComplete({selector:$("#search-by").get(0),source:function(term,response){response(search(term).slice(0,3));},renderItem:function(item,term){var numContextWords=2;var text=item.content.match("(?:\\s?(?:[\\w]+)\\s?){0,"+numContextWords+"}"+
term+"(?:\\s?(?:[\\w]+)\\s?){0,"+numContextWords+"}");item.context=text;return '<div class="autocomplete-suggestion" '+
'data-term="'+term+'" '+
'data-title="'+item.title+'" '+
'data-uri="'+item.uri+'" '+
'data-context="'+item.context+'">'+
'🎯 '+item.title+
'<div class="context">'+
(item.context||'')+'</div>'+
'</div>';},onSelect:function(e,term,item){location.href=item.getAttribute('data-uri');}});});