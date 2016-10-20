/**
 * Created by chibs on 27/09/2016.
 */
import jQuery from 'jquery';
window.jQuery=jQuery;
var totalPage;
var query_keywords;

//注册前台页面监听事件
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.type == 'ALERT'){
            alert(request.msg)
        }else if(request.type == 'GETQUERYKEYWORDS'){
            query_keywords = request.msg.split(/[ ,\r\n]/);
            // for(var kw of query_keywords){
            var kw = query_keywords.shift();
            while(kw != undefined){
                if(kw.trim() == ''){
                    kw = query_keywords.shift();
                }else{
                    break;
                }
            }

            if(kw && kw.trim() != ''){
                jQuery('#searchInput').val(kw);
                jQuery('#searchBtn')[0].click();
                window.setTimeout("window.getOnePageKW()",700);
            }
        }
});
var count = 0;
// chrome.storage.local.clear();

window.getOnePage = function () {
    var data = [];
    jQuery("#J-card-list .list-body .list-item .card-container .card-front .desc").each(function () {
        var email = jQuery(this).children('.email').attr('title') || '';
        var name = jQuery(this).children('.name').attr('title') || '';
        var company = jQuery(this).children('.company').attr('title') || '';
        var bi = jQuery(this).children('.bi-icon') || '';
        var country = jQuery(bi).children('span[data-country]').attr('data-country') || '';
        var grade = jQuery(bi).children('a[data-status]').attr('data-status') || '';
        // console.log(name+","+email+','+company+','+country + ',' +grade);
        var _data = {name:name,email:email,company:company,country:country,grade:grade};
        data.push(_data);
    });
    sendMsg("SAVEDATA",data);
    //TODO:
    if(!jQuery('.ui2-pagination-top .next').hasClass('disable') && count<1000000) {
        window.jQuery('.ui2-pagination-top .next')[0].click();
        window.setTimeout("window.getOnePage()",700);
        count++;
    }
    sendMsg("UPDATEPROGRESS",{ text: Math.round(count*100/totalPage)+'%'});
}
window.getOnePageKW = function () {
    var data = [];
    jQuery(".search-lists > .list li").each(function () {
        var name = jQuery(this).children('.word-name').children('.name').text() || '';
        var searchCount = jQuery(this).children('.search-num').text() || '';
        var trend = jQuery(this).children('.search-trend').children('span').text() || '';
        var goodsCount = jQuery(this).children('.goods-num').text() || '';
        var pv = jQuery(this).children('.pv').text() || '';

        var _data = {keyword:name,searchCount:searchCount,trend:trend,goodsCount:goodsCount,clickRate:pv};
        data.push(_data);
        // console.log(data);
    });
    sendMsg("SAVEDATAKW",data);
    //TODO:
    // if(jQuery('.search-lists .clearfix .pagination .pagination-end').length == 0 && count<1000000) {
    //     window.jQuery('.search-lists .clearfix .pagination .pagination-next')[0].click();
    //     window.setTimeout("window.getOnePageKW()",700);
    //     count++;
    // }else{
        var kw = query_keywords.shift();
        while(kw != undefined){
            if(kw.trim() == ''){
                kw = query_keywords.shift();
            }else{
                break;
            }
        }
        if(kw && kw.trim() != ''){
            jQuery('#searchInput').val(kw);
            jQuery('#searchBtn')[0].click();
            window.setTimeout("window.getOnePageKW()",700);
        }else {
            alert('Finish ~')
        }
    // }
    // sendMsg("UPDATEPROGRESS",{ text: Math.round(count*100/totalPage)+'%'});
};

jQuery(document).ready(function () {
    if(window.location.href == "http://profile.alibaba.com/receive_list.htm?export=true"){
        var r=confirm("Start crawling?")
        if (r==true)
        {
            totalPage = jQuery('.ui2-pagination-top').text().trim();
            totalPage = totalPage.substr(totalPage.indexOf('/')+1).replace('Next','').trim();
            window.getOnePage();
        }
    }else if(window.location.href == "https://sycm.1688.com/keyword/keyword_helper.htm?export=true"){
        var r=confirm("Start crawling?")
        if (r==true)
        {
            sendMsg("GETQUERYKEYWORDS");
        }

    }
});


//将获取内容传递给后台文件进行处理
function sendMsg( type, data ){
    //extensionID
    chrome.runtime.sendMessage({type: type, data: data}, function(response) {})
}
